const SimpleStorage = artifacts.require("./SimpleStorage.sol");
const Vote = artifacts.require("./Vote.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(Vote);
};
