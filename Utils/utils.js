var util = function () { };
/**
 * standard modules imports.
 */
const CircularJSON = require("circular-json");
const LogObjectConstant = require("../configs/constants");
const NodeRSA = require("node-rsa");
const fs = require("fs");
const winston = require("winston");
winston.transports.DailyRotateFile = require("winston-daily-rotate-file");
const winston_elasticsearch = require("winston-elasticsearch");
const elasticsearch = require("elasticsearch");
const Promise = require("promise");
require("winston-mongodb");

util.prototype.decryptor = param => {
  let logData;

  let path = require("../configs/config.json");

  let privateKey = fs.readFileSync(path.paths.keyPath, "utf8"); //Reading private Key from private.pem file

  const key = new NodeRSA(privateKey); //creating new instance of the node-rsa key with private key

  const decrypted = key.decrypt(param.log, "utf-8"); //Decrypting the Object with private Key

  let parsedObject = CircularJSON.parse(decrypted); // Converting it to JavaScript Object

  if (param.originTime || param.label || param.registryObject) {
    //Extracting inner object named 'config' from parsedObject
    logData = Object.assign(
      {
        originTime: param.originTime,
        label: param.label,
        registryObject: param.registryObject
      },
      parsedObject
    );
  } else {
    logData = parsedObject;
  }
  return logData;
};
/**
 *function which will create an loggable object from constant.js file
 *
 */
util.prototype.createLoggerObject = logData => {
  let logObject = {};
  let config = LogObjectConstant;

  for (keys in config) {
    //creating new Object for logging after mapping keys and value with the constants.js file
    Object.keys(logData).forEach(k => {
      if (keys == k) {
        logObject[config[keys]] = logData[k];
      }
    });
  }
  return logObject;
};

util.prototype.setTransport = function (config, level) {
  let transport;
  let logParam = {};
  switch (level) {
    case "error":
      logParam = config.errorLogFile;
      break;
    case "info":
      logParam = config.infoLogFile;
      break;
    case "warn":
      logParam = config.warnLogFile;
      break;
    case "debug":
      logParam = config.debugLogFile;
      break;
    case "verbose":
      logParam = config.verboseLogFile;
      break;
    case "trace":
      logParam = config.traceLogFile;
      break;
  }

  switch (config.loggerTransports.setTransport.type) {
    case "MongoDB":
      transport = new winston.transports.MongoDB({
        db: process.env.mongoUrl,
        options: { useNewUrlParser: true }
      });
      break;
    case "File":
      transport = new winston.transports.DailyRotateFile(logParam);
      break;

    default:
      transport;
      break;
  }
  return transport;
};

util.prototype.elasticClient = function (config, level, logObject) {
  return new Promise((resolve, reject) => {
    const client = new elasticsearch.Client({
      host: process.env.elasticsearchUrl
    });

    let setIndex;
    if (
      logObject.RegistryObject.registryName &&
      logObject.RegistryObject.registryName != null
    ) {
      setIndex = logObject.RegistryObject.registryName;
    } else if (
      logObject.RegistryObject.registryname &&
      logObject.RegistryObject.registryname != null
    ) {
      setIndex = logObject.RegistryObject.registryname;
    } else {
      setIndex = "get_all_logs";
    }
    logObject.level = level;
    logObject["@timestamp"] = new Date();

    client.index(
      {
        index: setIndex, //index should be lowercase which can be set in config,json file
        type: "log",
        body: logObject
      },
      (error, response) => {
        if (response) {
          if (response.result == "created") {
            resolve(response);
            if (response.error) {
              reject(error);
            }
          }
        }
        if (error) {
          reject(error);
        }
      }
    );
  });
};
module.exports = new util();
