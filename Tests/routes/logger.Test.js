/**
 * Company : FigMD Inc
 * Date: 15/10/2018(created), 18/10/2018(modified)
 * Add against Author <name of developer(Craeted/Modified)> separated by comma
 * Author: Rony Varghese(Created),
 * Module Purpose : This is a Unit Test case module. It contains all unit test case for routes/logger.js module.
 * All unit test cases are based on Mocha, Chai and Sinon.
 * Chage/Modification Details: Added test cases.
 */

/**
 * standard modules imports.
 */
const chai = require("chai");
let expect = chai.expect;
/**
 * Custom module imports.
 */
const logger = require("../../routes/logger");

/**
 *
 * Unit Test Case Group: 01 - logging Routers.
 *
 * */

describe("Test existance of logger class required methods.", function() {
  /**Check if error method exist in logger class.*/
  it("Test to check 'debug' router for logger class exist.", function() {
    expect(logger.debug).to.be.a("function");
  });
  /**Check if warning method exist in logger class.*/
  it("Test to check 'warning' router for logger class exist.", function() {
    expect(logger.warn).to.be.a("function");
  });
  /**Check if trace method exist in logger class.*/
  it("Test to check 'info' router for logger class exist.", function() {
    expect(logger.info).to.be.a("function");
  });
  /**Check if verbose method exist in logger class.*/
  it("Test to check 'verbose' method for logger class exist.", function() {
    expect(logger.verbose).to.be.a("function");
  });
  /**Check if error method exist in logger class */
  it("Test to check 'error' method for logger class exist.", function() {
    expect(logger.error).to.be.a("function");
  });
});
