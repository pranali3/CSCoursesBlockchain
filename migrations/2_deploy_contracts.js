var Course = artifacts.require("./Course.sol");

module.exports = function(deployer) {
  deployer.deploy(Course);
};
