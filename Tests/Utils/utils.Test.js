/**
 * Company : FigMD Inc
 * Date: 15/10/2018(created), 18/10/2018(modified)
 * Add against Author <name of developer(Craeted/Modified)> separated by comma
 * Author: Rony Varghese(Created),
 * Module Purpose : This is a Unit Test case module. It contains all unit test case for Utils/utils.js module.
 * All unit test cases are based on Mocha, Chai
 * Chnage/Modification Details: Added test cases.
 */

/**
 * standard modules imports.
 */
const chai = require("chai");
let expect = chai.expect;
const sinon = require("sinon");
/**
 * Custom module imports.
 */
const decrypted = require("../dummyLogData/Encrypted.json");
const util = require("../../Utils/utils");

/**
 *
 * Unit Test Case Group: 01 - utils/createObject Decrypt.
 *
 * */

describe("Check Decrypted Object properties and class members", () => {
  /**After Decryption of recieved data is should return javascript object */

  it("Will pass an encrypted data and will recieve decrypted data", () => {
    let res = util.createObject(decrypted.log);
    expect(res).should.be.a("Object");
  });

  it("Test for Utils class member initialization is complete", function(done) {
    done();
  });
});

/**------------------------------------------------------------------------------------------------------------------------- */
/**ToDo: Check the Decrypted object have appropriate properties or Not !.. */
describe("Check Decrypted Object have essential/required properties", () => {
  /**ToDo: Check the Decrypted object have 'Level' property or Not !.. */

  it("Check the Utils class returned decrypted Object have 'level' property", () => {
    let res = util.createObject(decrypted.log);

    expect(res).to.have.property("level");
  });

  /**Checking the Utils class returned decrypted Object have 'relationID' property or Not */
  it("Check the Utils class returned decrypted Object have 'relationID' property", () => {
    let res = util.createObject(decrypted.log);
    expect(res).to.have.property("relationID");
  });

  /**Checking the Utils class returned decrypted Object have 'requestID' property or Not */
  it("Check the Utils class returned decrypted Object have 'requestID' property", () => {
    let res = util.createObject(decrypted.log);
    expect(res).to.have.property("requestID");
  });

  it("Test for class utils/createObject() member initialization is complete", function(done) {
    done();
  });
});

/**------------------------------------------------------------------------------------------------------------------------- */

describe("Test for loggerService Utils class members initialization", function() {
  /**Test to check Utils class member 'level' initialization */
  it("Test loggerService Utils class 'level' member is initialized", function() {
    let res = util.createObject(decrypted.log);
    expect(res.level).to.not.be.undefined;
  });

  /**Test to check Utils class member 'relationID' initialization */
  it("Test utils/createObject 'relationID' member is initialized", function() {
    let res = util.createObject(decrypted.log);
    expect(res.relationID).to.not.be.undefined;
  });

  /**Test to check Utils class member 'requestID' initialization */
  it("Test utils/createObject 'requestID' member is initialized", function() {
    let res = util.createObject(decrypted.log);
    expect(res.requestID).to.not.be.undefined;
  });

  /**Utils class mebmeber initialization complete */
  it("Test for Utils class member initialization is complete", function(done) {
    done();
  });
});

describe("Test to check Utils/createObject method parameter type", () => {
  it("should check 'logService' method parameter type  ", () => {
    /* setup a sinon spy on loggerinterface object with 'addErrorLog' method. */
    var spy = sinon.spy(util, "createObject");
    //Call loggerinterface 'addErrorLog' to log object.
    util.createObject(decrypted.log);
    //Get first argument of the first call.
    var spyArg1 = spy.args[0][0];
    // argument to logService should be string.
    expect(spyArg1).to.be.a("string");
  });
});
