/**
 * Company : FigMD Inc
 * Date: 15/10/2018(created), 18/10/2018(modified)
 * Author: Rony Varghese(Created),
 * Module Purpose : This is a entry point in which 5 rest api's are been implemented which will handle logging.
 */
/**
 * standard modules imports.
 */
const express = require("express");
require("dotenv").config();
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
var app = express();
const logger = require("./routes/logger");
let port = process.env.PORT || 5002;

var accessLogStream = fs.createWriteStream(
  path.join(__dirname, "./logs/serviceRequest.log"), // create a write stream (in append mode)
  {
    flags: "a"
  }
);

app.use(cors()); //This is CORS-enabled for all origins!

app.use(morgan("combined", { stream: accessLogStream, immediate: true })); // setup the logger for logger Microservice

app.use(bodyParser.json({ limit: "50mb" })); // parse application/json with some extra limitation

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // parse application/x-www-form-urlencoded
/**
 * The logging rest api's
 */
app.post("/error", logger.error); //error rest api

app.post("/verbose", logger.verbose); //verbose rest api

app.post("/info", logger.info); //info rest api

app.post("/warn", logger.warn); //warn rest api

app.post("/debug", logger.debug); //debug rest api

app.post("/trace", logger.Trace); //trace rest api
/**
 * Api which will be used by Utils/queueDispatcher to check the logging MicroService is active or not
 */
app.get("/checkStatus", logger.checkStatus);

app.post("/setConfig", logger.setConfig);

app.listen(port, (error, response) => {
  console.log(`Service listening at port ${port}`);
  if (error) {
    console.log(error);
  }
});
module.exports = app;
