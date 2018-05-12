let BigNumber = require('bignumber.js');
let Vote = artifacts.require("./Vote.sol");

contract('Vote', function (accounts) {

    let account1 = accounts[0];
    let account2 = accounts[1];
    let account3 = accounts[2];
    let account4 = accounts[3];
    let account5 = accounts[4];
    let account6 = accounts[5];
    let account7 = accounts[6];
    let account8 = accounts[7];

    /**
     * Test success for cost
     */
    it("...should get the cost per vote.", async function () {
        const vote = await Vote.deployed();
        const costPerVote = (await vote.getCostPerVote({from: account1})).toNumber();

        const n = new BigNumber(costPerVote);
        const costPerVoteStringify = web3.fromWei(n, 'ether');

        assert.equal(costPerVoteStringify, 0.01, "The cost per vote must be 0.01.");
    });

    /**
     * Check for an error, with a cost value of 0.02 of type number
     */
    it("...should get the cost per vote an check error.", async function () {
        const vote = await Vote.deployed();
        const costPerVote = (await vote.getCostPerVote({from: account1})).toNumber();

        const n = new BigNumber(costPerVote);
        const costPerVoteStringify = web3.fromWei(n, 'ether');

        assert.notStrictEqual(costPerVoteStringify, 0.02, "The cost per vote must be 0.01.");
    });

    /**
     * Check for an error, with a cost value of 0.01 of type string
     */
    it("...should get the cost per vote an check error.", async function () {
        const vote = await Vote.deployed();
        const costPerVote = (await vote.getCostPerVote({from: account1})).toNumber();

        const n = new BigNumber(costPerVote);
        const costPerVoteStringify = web3.fromWei(n, 'ether');

        assert.notStrictEqual(costPerVoteStringify, '0.01', "The cost per vote must be 0.01.");
    });

    /**
     * Check for an error, with a cost value of 0.02 of type string
     */
    it("...should get the cost per vote an check error.", async function () {
        const vote = await Vote.deployed();
        const costPerVote = (await vote.getCostPerVote({from: account1})).toNumber();

        const n = new BigNumber(costPerVote);
        const costPerVoteStringify = web3.fromWei(n, 'ether');

        assert.notStrictEqual(costPerVoteStringify, '0.02', "The cost per vote must be 0.01.");
    });

    /**
     * Check for an error, cant vote for yes without pay
     */
    it("...cant vote for yes without pay.", async function () {
        const vote = await Vote.deployed();

        try {
            await vote.voteYes({from: account1});
        } catch (error) {
            const revert = error.message.search('revert') >= 1;
            const invalidOpcode = error.message.search('invalid opcode') >= 0;
            const outOfGas = error.message.search('out of gas') >= 0;
            assert(
                invalidOpcode || outOfGas || revert,
                'Expected throw, got \'' + error + '\' instead',
            );
            return;
        }
        assert.fail('Expected throw not received');

    });

    /**
     * Check for an error, cant vote for no without pay
     */
    it("...cant vote for no without pay.", async function () {
        const vote = await Vote.deployed();

        try {
            await vote.voteNo({from: account1});
        } catch (error) {
            const revert = error.message.search('revert') >= 1;
            const invalidOpcode = error.message.search('invalid opcode') >= 0;
            const outOfGas = error.message.search('out of gas') >= 0;
            assert(
                invalidOpcode || outOfGas || revert,
                'Expected throw, got \'' + error + '\' instead',
            );
            return;
        }
        assert.fail('Expected throw not received');

    });

    /**
     * Success, try to vote for yes
     */
    it("...can vote for yes.", async function () {
        const vote = await Vote.deployed();

        await vote.voteYes({value: web3.toWei(0.01, "ether"), from: account1});
        const voteYes = await vote.getVotedYes({from: account1});
        const n = new BigNumber(voteYes);

        assert.equal(n, 1, "The vote for yes must be 1.");
    });

    /**
     * Error, try to vote for no
     */
    it("...you cant vote again.", async function () {
        const vote = await Vote.deployed();

        try {

            await vote.voteNo({value: web3.toWei(0.01, "ether"), from: account1});

        } catch (error) {
            const revert = error.message.search('revert') >= 1;
            const invalidOpcode = error.message.search('invalid opcode') >= 0;
            const outOfGas = error.message.search('out of gas') >= 0;
            assert(
                invalidOpcode || outOfGas || revert,
                'Expected throw, got \'' + error + '\' instead',
            );
            return;
        }
        assert.fail('Expected throw not received');
    });

    /**
     * Success, try to vote for no
     */
    it("...can vote for no.", async function () {
        const vote = await Vote.deployed();

        await vote.voteNo({value: web3.toWei(0.01, "ether"), from: account2});
        const voteNo = await vote.getVotedNo({from: account2});
        const n = new BigNumber(voteNo);

        assert.equal(n, 1, "The vote for no must be 1.");
    });

    /**
     * Error, try to vote for yes
     */
    it("...you cant vote again.", async function () {
        const vote = await Vote.deployed();

        try {

            await vote.voteYes({value: web3.toWei(0.01, "ether"), from: account2});

        } catch (error) {
            const revert = error.message.search('revert') >= 1;
            const invalidOpcode = error.message.search('invalid opcode') >= 0;
            const outOfGas = error.message.search('out of gas') >= 0;
            assert(
                invalidOpcode || outOfGas || revert,
                'Expected throw, got \'' + error + '\' instead',
            );
            return;
        }
        assert.fail('Expected throw not received');
    });

    /**
     * Success, try to vote for no multiple times
     */
    it("...can vote for no multiple times.", async function () {
        const vote = await Vote.deployed();

        await vote.voteNo({value: web3.toWei(0.01, "ether"), from: account3});
        await vote.voteNo({value: web3.toWei(0.01, "ether"), from: account4});

        const voteNo = (await vote.getVotedNo({from: account2})).toNumber();

        assert.equal(voteNo, 3, "The vote for no must be 3."); // Exist one more vote in another previous test
    });

    /**
     * Success, try to vote for yes multiple times
     */
    it("...can vote for yes multiple times.", async function () {
        const vote = await Vote.deployed();

        await vote.voteYes({value: web3.toWei(0.01, "ether"), from: account5});
        await vote.voteYes({value: web3.toWei(0.01, "ether"), from: account6});

        const voteYes = (await vote.getVotedYes({from: account2})).toNumber();

        assert.equal(voteYes, 3, "The vote for yes must be 3."); // Exist one more vote in another previous test
    });

    /**
     * Success, my vote was true
     */
    it("...my vote was true.", async function () {
        const vote = await Vote.deployed();
        const myVote = await vote.myVote({from: account5});
        assert.ok(myVote, "The vote must be true.");
    });

    /**
     * Success, my vote was true
     */
    it("...my vote was true.", async function () {
        const vote = await Vote.deployed();
        const myVote = await vote.myVote({from: account6});
        assert.ok(myVote, "The vote must be true.");
    });

    /**
     * Success, my vote was false
     */
    it("...my vote was false.", async function () {
        const vote = await Vote.deployed();
        const myVote = await vote.myVote({from: account3});
        assert.ok(!myVote, "The vote must be false.");
    });

    /**
     * Success, my vote was false
     */
    it("...my vote was false.", async function () {
        const vote = await Vote.deployed();
        const myVote = await vote.myVote({from: account4});
        assert.ok(!myVote, "The vote must be false.");
    });

    /**
     * Success, already vote
     */
    it("...already vote.", async function () {
        const vote = await Vote.deployed();
        const alreadyVote = await vote.alreadyVote({from: account5});
        assert.ok(alreadyVote, "The address already vote.");
    });

    /**
     * Success, already vote
     */
    it("...already vote.", async function () {
        const vote = await Vote.deployed();
        const alreadyVote = await vote.alreadyVote({from: account6});
        assert.ok(alreadyVote, "The address already vote.");
    });

    /**
     * Success, already vote
     */
    it("...already vote.", async function () {
        const vote = await Vote.deployed();
        const alreadyVote = await vote.alreadyVote({from: account3});
        assert.ok(alreadyVote, "The address already vote.");
    });

    /**
     * Success, already vote
     */
    it("...already vote.", async function () {
        const vote = await Vote.deployed();
        const alreadyVote = await vote.alreadyVote({from: account4});
        assert.ok(alreadyVote, "The address already vote.");
    });

    /**
     * Error, already vote
     */
    it("...not already vote.", async function () {
        const vote = await Vote.deployed();
        const alreadyVote = await vote.alreadyVote({from: account7});
        assert.ok(!alreadyVote, "The address not vote.");
    });

    /**
     * Error, already vote
     */
    it("...not already vote.", async function () {
        const vote = await Vote.deployed();
        const alreadyVote = await vote.alreadyVote({from: account8});
        assert.ok(!alreadyVote, "The address not vote.");
    });

    /**
     * Error, never vote
     */
    it("...the address never vote.", async function () {
        const vote = await Vote.deployed();

        try {
            await vote.myVote({from: account7});
        } catch (error) {
            const revert = error.message.search('revert') >= 1;
            const invalidOpcode = error.message.search('invalid opcode') >= 0;
            const outOfGas = error.message.search('out of gas') >= 0;
            assert(
                invalidOpcode || outOfGas || revert,
                'Expected throw, got \'' + error + '\' instead',
            );
            return;
        }
        assert.fail('Expected throw not received');
    });

    /**
     * Error, never vote
     */
    it("...the address never vote.", async function () {
        const vote = await Vote.deployed();

        try {
            await vote.myVote({from: account8});
        } catch (error) {
            const revert = error.message.search('revert') >= 1;
            const invalidOpcode = error.message.search('invalid opcode') >= 0;
            const outOfGas = error.message.search('out of gas') >= 0;
            assert(
                invalidOpcode || outOfGas || revert,
                'Expected throw, got \'' + error + '\' instead',
            );
            return;
        }
        assert.fail('Expected throw not received');
    });
});
