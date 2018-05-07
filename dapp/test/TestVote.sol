pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Vote.sol";

contract TestVote {

  function testSuccessConstCostPerVote() public {
    Vote vote = Vote(DeployedAddresses.Vote());

    uint cost = 0.01 ether;

    Assert.equal(vote.getCostPerVote(), cost, "It should cost per vote 0.01.");
  }

  function testErrorConstCostPerVote() public {
    Vote vote = Vote(DeployedAddresses.Vote());

    uint cost = 0.05 ether;

    Assert.isFalse(vote.getCostPerVote() == cost, "It should cost per vote 0.01.");
  }

}
