/**
 * Company : FigMD Inc
 * Date: 15/10/2018(created), 18/10/2018(modified)
 * Add against Author <name of developer(Craeted/Modified)> separated by comma
 * Author: Rony Varghese(Created),
 * Module Purpose : This is a log routing file in which winston log package will log.
 */
/**
 * standard modules imports.
 */
const express = require("express");
const router = express.Router();
const winston = require("winston");
winston.transports.DailyRotateFile = require("winston-daily-rotate-file");
const Elasticsearch = require("winston-elasticsearch");
const { format } = winston;
const { combine, label, timestamp } = format;
const fs = require("fs");
/**
 * Custom module imports.
 */
const util = require("../Utils/utils");
const myCustomLevels = {
  levels: {
    trace: 4
  }
};
/**
 * Express router for error api which will log error level log Object
 */
router.error = (req, res) => {
  let logObject = {};
  let logData = "";
  /**
   * passing the encrypted data to util.createObject method which will do the decryption process
   * which will return an javascript Decrypted object..
   */
  if (req.headers["islogencrypted"] == "false") {
    // logObject = req.body;
    logObject = req.body.log;
    logObject.label = req.body.label;
    logObject.originTime = req.body.originTime;
  } else if (req.body.PHI) {
    logObject.phi_Status = req.body.PHI;
    logObject.acknowledgement = "The logs are in encrypted form.";
    logObject.log = req.body.log;
    logObject.label = req.body.label;
    logObject.originTime = req.body.originTime;
    logObject.RegistryObject = req.body.registryObject;
    logData = logObject;
  } else {
    logObject = util.decryptor(req.body);
    logData = util.createLoggerObject(logObject);
  }

  /**
   * Winston inbuilt function which will clear all default assigned transports
   */
  winston.clear();
  /**
   * reading configurable winston properties which will later passed to winston Trasnsport function
   */
  let config = fs.readFileSync("./configs/config.json", "utf8");

  let parsedConfig = JSON.parse(config);
  /**
   * Creating winston Container instance which will be our logger object
   */

  const container = new winston.Container();

  if (parsedConfig.loggerTransports.setTransport.type != "elasticsearch") {
    let transport = util.setTransport(parsedConfig, "error");

    /**
     * Configure the logger for "errorLog"
     */
    container.add("errorLog", {
      format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.json()
      ),
      /**
       * Configure the transport for logging "errorLog".
       * Currently logs are logged to .log files in logs folder
       */
      transports: [transport]
    });
    /**
     * Grab your preconfigured logger
     */
    const containers = container.get("errorLog");
    /**
     * logging logObject with preconfigured logger/container of error level
     */
    containers.error(logData);
    res.send("logged successfully");
  } else {
    util
      .elasticClient(parsedConfig, "error", logData, res)
      .then(response => {
        if (response.result == "created") {
          res.send("logged successfully");
        }
      })
      .catch(error => {
        res.send(error.message);
      });
  }
};
/**
 * Express router for verbose api which will log verbose level log Object
 * */

router.verbose = (req, res) => {
  let logObject = {};
  let logData = "";
  /**
   * passing the encrypted data to util.createObject method which will do the decryption process
   * which will return an javascript Decrypted object..
   */
  if (req.headers["islogencrypted"] == "false") {
    // logObject = req.body;
    logObject = req.body.log;

    logObject.label = req.body.label;
    logObject.originTime = req.body.originTime;
  } else if (req.body.PHI) {
    logObject.phi_Status = req.body.PHI;
    logObject.acknowledgement = "The logs are in encrypted form.";
    logObject.log = req.body.log;
    logObject.label = req.body.label;
    logObject.originTime = req.body.originTime;
    logObject.RegistryObject = req.body.registryObject;
    logData = logObject;
  } else {
    logObject = util.decryptor(req.body);
    logData = util.createLoggerObject(logObject);
  }
  /**
   * Winston inbuilt function which will clear all default assigned transports
   */
  winston.clear();
  /**
   * reading configurable winston properties which will later passed to winston Trasnsport function
   */
  let config = fs.readFileSync("./configs/config.json", "utf8");
  let parsedConfig = JSON.parse(config);
  /**
   * Creating winston Container instance which will be our logger object
   */

  const container = new winston.Container();
  /**
   * Configure the logger for "verboseLog"
   */
  if (parsedConfig.loggerTransports.setTransport.type != "elasticsearch") {
    let transport = util.setTransport(parsedConfig, "verbose");

    container.add("verboseLog", {
      format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.json()
      ),
      /**
       * Configure the transport for logging "verboseLog".
       * Currently logs are logged to .log files in logs folder
       */
      transports: [transport]
    });
    /**
     * Grab your preconfigured logger
     */
    const containers = container.get("verboseLog");
    /**
     * logging logObject with preconfigured logger/container of verbose level
     */
    containers.verbose(logData);
    res.send("logged successfully");
  } else {
    util
      .elasticClient(parsedConfig, "verbose", logData, res)
      .then(response => {
        if (response.result == "created") {
          res.send("logged successfully");
        }
      })
      .catch(error => {
        res.send(error.message);
      });
  }
};
/**
 * Express router for info api which will log info level log Object
 * */
router.info = (req, res) => {
  let logObject = {};
  let logData = "";
  /**
   * passing the encrypted data to util.createObject method which will do the decryption process
   * which will return an javascript Decrypted object..
   */
  if (req.headers["islogencrypted"] == "false") {
    // logObject = req.body;
    logObject = req.body.log;

    logObject.label = req.body.label;
    logObject.originTime = req.body.originTime;
  } else if (req.body.PHI) {
    logObject.phi_Status = req.body.PHI;
    logObject.acknowledgement = "The logs are in encrypted form.";
    logObject.log = req.body.log;
    logObject.label = req.body.label;
    logObject.originTime = req.body.originTime;
    logObject.RegistryObject = req.body.registryObject;
    logData = logObject;
  } else {
    logObject = util.decryptor(req.body);
    logData = util.createLoggerObject(logObject);
  }
  /**
   * Winston inbuilt function which will clear all default assigned transports
   */
  winston.clear();
  /**
   * reading configurable winston properties which will later passed to winston Trasnsport function
   */
  let config = fs.readFileSync("./configs/config.json", "utf8");
  let parsedConfig = JSON.parse(config);
  /**
   * Creating winston Container instance which will be our logger object
   */

  const container = new winston.Container();
  /**
   * Configure the logger for "infoLog"
   */
  if (parsedConfig.loggerTransports.setTransport.type != "elasticsearch") {
    let transport = util.setTransport(parsedConfig, "info");

    container.add("infoLog", {
      format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.json()
      ),
      /**
       * Configure the transport for logging "infoLog".
       * Currently logs are logged to .log files in logs folder
       */
      transports: [transport]
    });
    /**
     * Grab your preconfigured logger
     */
    const containers = container.get("infoLog");
    /**
     * logging logObject with preconfigured logger/container of info level
     */
    containers.info(logData);
    res.send("logged successfully");
  } else {
    util
      .elasticClient(parsedConfig, "info", logData, res)
      .then(response => {
        if (response.result == "created") {
          res.send("logged successfully");
        }
      })
      .catch(error => {
        res.send(error.message);
      });
  }
};
/**
 * Express router for debug api which will log debug level log Object
 * */
router.debug = (req, res) => {
  let logObject = {};
  let logData = "";
  /**
   * passing the encrypted data to util.createObject method which will do the decryption process
   * which will return an javascript Decrypted object..
   */
  if (req.headers["islogencrypted"] == "false") {
    // logObject = req.body;
    logObject = req.body.log;

    logObject.label = req.body.label;
    logObject.originTime = req.body.originTime;
  } else if (req.body.PHI) {
    logObject.phi_Status = req.body.PHI;
    logObject.acknowledgement = "The logs are in encrypted form.";
    logObject.log = req.body.log;
    logObject.label = req.body.label;
    logObject.originTime = req.body.originTime;
    logObject.RegistryObject = req.body.registryObject;
    logData = logObject;
  } else {
    logObject = util.decryptor(req.body);
    logData = util.createLoggerObject(logObject);
  }
  /**
   * Winston inbuilt function which will clear all default assigned transports
   */
  winston.clear();

  /**
   * reading configurable winston properties which will later passed to winston Trasnsport function
   */
  let config = fs.readFileSync("./configs/config.json", "utf8");
  let parsedConfig = JSON.parse(config);
  /**
   * Creating winston Container instance which will be our logger object
   */

  const container = new winston.Container();
  /**
   * Configure the logger for "debugLog"
   */
  if (parsedConfig.loggerTransports.setTransport.type != "elasticsearch") {
    let transport = util.setTransport(parsedConfig, "debug");

    container.add("debugLog", {
      format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.json()
      ),
      /**
       * Configure the transport for logging "debugLog".
       * Currently logs are logged to .log files in logs folder
       */
      transports: [transport]
    });
    /**
     * Grab your preconfigured logger
     */
    const containers = container.get("debugLog");
    /**
     * logging logObject with preconfigured logger/container of debug level
     */
    containers.debug(logData);
    res.send("logged successfully");
  } else {
    util
      .elasticClient(parsedConfig, "debug", logData, res)
      .then(response => {
        if (response.result == "created") {
          res.send("logged successfully");
        }
      })
      .catch(error => {
        res.send(error.message);
      });
  }
};
/**
 * Express router for warning api which will log warning level log Object
 **/
router.warn = (req, res) => {
  let logObject = {};
  let logData = "";
  /**
   * passing the encrypted data to util.createObject method which will do the decryption process
   * which will return an javascript Decrypted object..
   */
  if (req.headers["islogencrypted"] == "false") {
    // logObject = req.body;
    logObject = req.body.log;

    logObject.label = req.body.label;
    logObject.originTime = req.body.originTime;
  } else if (req.body.PHI) {
    logObject.phi_Status = req.body.PHI;
    logObject.acknowledgement = "The logs are in encrypted form.";
    logObject.log = req.body.log;
    logObject.label = req.body.label;
    logObject.originTime = req.body.originTime;
    logObject.RegistryObject = req.body.registryObject;
    logData = logObject;
  } else {
    logObject = util.decryptor(req.body);
    logData = util.createLoggerObject(logObject);
  }
  /**
   * Winston inbuilt function which will clear all default assigned transports
   */
  winston.clear();

  /**
   * reading configurable winston properties which will later passed to winston Trasnsport function
   */
  let config = fs.readFileSync("./configs/config.json", "utf8");
  let parsedConfig = JSON.parse(config);
  /**
   * Creating winston Container instance which will be our logger object
   */

  const container = new winston.Container();
  /**
   * Configure the logger for "warnLog"
   */
  if (parsedConfig.loggerTransports.setTransport.type != "elasticsearch") {
    let transport = util.setTransport(parsedConfig, "warn");

    container.add("warnLog", {
      format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.json()
      ),
      /**
       * Configure the transport for logging "warnLog".
       * Currently logs are logged to .log files in logs folder
       */
      transports: [transport]
    });
    /**
     * Grab your preconfigured logger
     */
    const containers = container.get("warnLog");
    /**
     * logging logObject with preconfigured logger/container of warn level
     */
    containers.warn(logData);
    res.send("logged successfully");
  } else {
    util
      .elasticClient(parsedConfig, "warn", logData, res)
      .then(response => {
        if (response.result == "created") {
          res.send("logged successfully");
        }
      })
      .catch(error => {
        res.send(error.message);
      });
  }
};

/**
 * Express router for trace api which will log trace level log Object
 **/
router.Trace = (req, res) => {
  let logObject = {};
  let logData = "";

  /**
   * passing the encrypted data to util.createObject method which will do the decryption process
   * which will return an javascript Decrypted object..
   */
  if (req.headers["islogencrypted"] == "false") {
    // logObject = req.body;
    logObject = req.body.log;

    logObject.label = req.body.label;
    logObject.originTime = req.body.originTime;
  } else if (req.body.PHI) {
    logObject.phi_Status = req.body.PHI;
    logObject.acknowledgement = "The logs are in encrypted form.";
    logObject.log = req.body.log;
    logObject.label = req.body.label;
    logObject.originTime = req.body.originTime;
    logObject.RegistryObject = req.body.registryObject;
    logData = logObject;
  } else {
    logObject = util.decryptor(req.body);
    logData = util.createLoggerObject(logObject);
  }
  /**
   * Winston inbuilt function which will clear all default assigned transports
   */
  winston.clear();
  /**
   * reading configurable winston properties which will later passed to winston Trasnsport function
   */
  let config = fs.readFileSync("./configs/config.json", "utf8");
  let parsedConfig = JSON.parse(config);
  /**
   * Creating winston Container instance which will be our logger object
   */

  /**
   * Configure the logger for "traceLog"
   */
  if (parsedConfig.loggerTransports.setTransport.type != "elasticsearch") {
    let transport = util.setTransport(parsedConfig, "trace");

    const Logger = winston.createLogger({
      levels: myCustomLevels.levels,
      format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        format.json()
      ),
      transports: [transport]
    });

    /**
     * logging logObject with preconfigured customLogger of trace level
     */
    Logger.trace(logData);
    res.send("logged successfully");
  } else {
    util
      .elasticClient(parsedConfig, "trace", logData, res)
      .then(response => {
        if (response.result == "created") {
          res.send("logged successfully");
        }
      })
      .catch(error => {
        res.send(error.message);
      });
  }
};

/**
 * Express router which will be called every 5 minutes to check the loggerService is
 * active or not.
 * This Below api will be called by Utils/readQueue/checkAPI method.
 **/
router.checkStatus = (req, res) => {
  res.send(process.env.NODE_ENV);
};

router.setConfig = (req, res) => {
  let config = req.body;
  fs.writeFileSync("./configs/config.json", JSON.stringify(config));
};
module.exports = router;
