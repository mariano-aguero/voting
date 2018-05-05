pragma solidity ^0.4.18;

contract Vote {

    /**
     * Variables that accumulate quantities by categories 'yes' or 'no'
     */
    uint votedYes = 0;
    uint votedNo = 0;

    /**
     * Constant that keeps the cost of every voting
     */
    uint public constant COST_PER_VOTE = 0.01 ether;

    /**
     * Collection of votes
     */
    mapping(address => bool) votes;

    /**
     * Events
     */
    event VoteYes(address _voter);
    event VoteNo(address _voter);

    /**
     * Function that allows to vote for 'yes'
     */
    function voteYes() checkValue payable public {

        if (votes[msg.sender]) revert();

        votes[msg.sender] = true;
        ++votedYes;
    }

    /**
     * Function that allows to vote for 'no'
     */
    function voteNo() checkValue payable public {

        if (votes[msg.sender]) revert();

        votes[msg.sender] = true;
        ++votedNo;
    }

    /**
     * Function that gets the number of positive votes
     */
    function getVotedYes() public constant returns (uint result){
        result = votedYes;
    }

    /**
     * Function that gets the number of negative votes
     */
    function getVotedNo() public constant returns (uint result){
        result = votedNo;
    }

    /**
     * Refund the excess value back to sender
     */
    modifier checkValue() {
        require(msg.value == COST_PER_VOTE, 'Amount to pay must be 0.01 ether');
        _;
    }

    /**
     * Get Owner
     */
    function getOwner() public constant returns (address result){
        result = msg.sender;
    }
}