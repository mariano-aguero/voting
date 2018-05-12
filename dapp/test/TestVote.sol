pragma solidity 0.4.23;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Vote.sol";

contract TestVote {

    Vote vote;
    uint public initialBalance = 10 ether;

    function() public payable {}

    function beforeEach() public {
        vote = new Vote();
    }

    function testSuccessConstCostPerVote() public {
        uint cost = 0.01 ether;
        Assert.equal(vote.getCostPerVote(), cost, "It should cost per vote 0.01.");
    }

    function testErrorConstCostPerVote() public {
        uint cost = 0.05 ether;
        Assert.isFalse(vote.getCostPerVote() == cost, "It should cost per vote 0.01.");
    }

    function testSettingAnOwnerOfDeployedContract() public {
        vote = Vote(DeployedAddresses.Vote());
        Assert.isFalse(vote.getOwner() == msg.sender, "An owner is different than a deployer");
    }

    function testSuccessVoteYes() public {
        vote.voteYes.value(0.01 ether)();
        Assert.equal(vote.getVotedYes(), 1, "Should exist 1 vote for yes");
    }

    function testSuccessVoteNo() public {
        vote.voteNo.value(0.01 ether)();
        Assert.equal(vote.getVotedNo(), 1, "Should exist 1 vote for no");
    }

    function testSuccessVoteYesMyvote() public {
        vote.voteYes.value(0.01 ether)();
        Assert.isTrue(vote.myVote(), "Should return true");
    }

    function testSuccessVoteNoMyVote() public {
        vote.voteNo.value(0.01 ether)();
        Assert.isFalse(vote.myVote(), "Should return false");
    }

    function testSuccessVoteNoAlreadyVote() public {
        vote.voteNo.value(0.01 ether)();
        Assert.isTrue(vote.alreadyVote(), "Should return true");
    }

    function testSuccessVoteYesAlreadyVote() public {
        vote.voteYes.value(0.01 ether)();
        Assert.isTrue(vote.alreadyVote(), "Should return true");
    }
}
