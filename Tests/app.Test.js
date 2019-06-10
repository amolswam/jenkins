/**
 * Company : FigMD Inc
 * Date: 15/10/2018(created), 18/10/2018(modified)
 * Add against Author <name of developer(Craeted/Modified)> separated by comma
 * Author: Rony Varghese(Created),
 * Module Purpose : This is a Unit Test case module. It contains all unit test case for app.js module.
 * All unit test cases are based on Mocha, Chai and chaiHttp
 * Change/Modification Details: Added test cases.
 */

/**
 * standard modules imports.
 */
const chai = require("chai");
const app = require("../app");
const chaiHttp = require("chai-http");
const should = chai.should();
chai.use(chaiHttp);
/**
 * Custom module imports.
 */
const decryptedData = require("./dummyLogData/AddErrorLog.json");

/**Checking the rest api for error logging */
describe("Call loggerService error api for logging error level log data", () => {
  it("Should return error log api response", done => {
    chai
      .request(app)
      .post("/error")
      .send(decryptedData)
      .end((err, res) => {
        console.log(JSON.stringify(res));
        res.should.have.status(200);
        res.should.have.property("text");
        res.should.have.property("text").equal("logged successfully");
        done();
      });
  });
  it("Should return verbose log api response", done => {
    chai
      .request(app)
      .post("/verbose")
      .send(decryptedData)
      .end((err, res) => {
        console.log(JSON.stringify(res));
        res.should.have.status(200);
        res.should.have.property("text");
        res.should.have.property("text").equal("logged successfully");
        done();
      });
  });
  it("Should return info log api response", done => {
    chai
      .request(app)
      .post("/info")
      .send(decryptedData)
      .end((err, res) => {
        console.log(JSON.stringify(res));
        res.should.have.status(200);
        res.should.have.property("text");
        res.should.have.property("text").equal("logged successfully");
        done();
      });
  });
  it("Should return warn log api response", done => {
    chai
      .request(app)
      .post("/warn")
      .send(decryptedData)
      .end((err, res) => {
        console.log(JSON.stringify(res));
        res.should.have.status(200);
        res.should.have.property("text");
        res.should.have.property("text").equal("logged successfully");
        done();
      });
  });
  it("Should return debug log api response", done => {
    chai
      .request(app)
      .post("/debug")
      .send(decryptedData)
      .end((err, res) => {
        console.log(JSON.stringify(res));
        res.should.have.status(200);
        res.should.have.property("text");
        res.should.have.property("text").equal("logged successfully");
        done();
      });
  });
});

/**
 * Checking the rest api for RabbitMQ Queue service update logging */
describe("/POST method to Check loggerService or up or Not", () => {
  it("Should return logger api response for adding Queue logdata", done => {
    chai
      .request(app)
      .post("/checkStatus")
      .send("is the Service Up")
      .end((err, res) => {
        console.log(JSON.stringify(res));
        res.should.have.status(200);
        res.should.have.property("text");
        res.should.have.property("text").equal("LoggerService is Up");
        done();
      });
  });
});
