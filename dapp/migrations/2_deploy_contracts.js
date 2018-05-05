var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var Vote = artifacts.require("./Vote.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Vote);
};
