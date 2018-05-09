pragma solidity 0.4.18;

contract Vote {

    /**
    * Variables that accumulate quantities by categories 'yes' or 'no'
    */
    uint votedYes = 0;
    uint votedNo = 0;

    struct Response {
        bool vote;
        bool doit;
    }

    /**
    * Constant that keeps the cost of every voting
    */
    uint public constant COST_PER_VOTE = 0.01 ether;

    /**
    * Collection of votes
    */
    mapping(address => Response) votes;

    /**
    * Events
    */
    event VoteYes(address _voter);
    event VoteNo(address _voter);

    /**
    * Function that allows to vote for 'yes'
    */
    function voteYes() checkValue payable public {
        // Check with require if address already vote
        require(votes[msg.sender].doit == false, "Already vote");

        votes[msg.sender].vote = true;
        votes[msg.sender].doit = true;
        ++votedYes;
    }

    /**
    * Function that allows to vote for 'no'
    */
    function voteNo() checkValue payable public {
        // Check with require if address already vote
        require(votes[msg.sender].doit == false, "Already vote");

        votes[msg.sender].vote = false;
        votes[msg.sender].doit = true;
        ++votedNo;
    }

    /**
    * Function that gets the number of positive votes
    */
    function getVotedYes() public view returns (uint result){
        result = votedYes;
    }

    /**
    * Function that gets the number of negative votes
    */
    function getVotedNo() public view returns (uint result){
        result = votedNo;
    }

    /**
    * Refund the excess value back to sender
    */
    modifier checkValue() {
        require(msg.value == COST_PER_VOTE, "Amount to pay must be 0.01 ether");
        _;
    }

    /**
    * Get Owner
    */
    function getOwner() public view returns (address result){
        result = msg.sender;
    }

    /**
    * Check if the user already vote
    */
    function alreadyVote() public view returns (bool result){
        result = votes[msg.sender].doit;
    }

    /**
    * Check the user vote
    */
    function myVote() public view returns (bool result){
        result = votes[msg.sender].vote;
    }

    /**
    * Function that gets the cost
    */
    function getCostPerVote() public pure returns (uint result){
        result = COST_PER_VOTE;
    }

}
