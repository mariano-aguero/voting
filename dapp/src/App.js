import {Component} from 'react';
import {Button, ButtonToolbar, Container, Jumbotron, ListGroup, ListGroupItem} from 'reactstrap';
import VoteContract from '../build/contracts/Vote.json';
import getWeb3 from './utils/getWeb3';
import Alert from 'react-s-alert';

import './App.css';
// Bootstrap
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
// Alert message
import './../node_modules/react-s-alert/dist/s-alert-default.css';

const voteYes = 'yes';
const voteNo = 'no';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hidden: "hidden",
            web3: null,             // variable that manage web3 instance
            contractInstance: null, // variable that manage the vote contract instance
            buttonSubmitted: null,  // disable button on submit
            alreadyVote: false,     // variable that know if an account already vote
            myVote: null,           // my vote on the contract
            account: null,          // actual account
            quantityOfVoteForNo: 0, // results for 'no'
            quantityOfVoteForYes: 0,// results fot 'yes'
            latestFilter: null,     // filter to latest block
            txHash: null            // transaction hash related to the user vote
        };

    }

    /**
     * Will mount web3 and instantiate
     * @returns {Promise.<void>}
     */
    async componentWillMount() {
        // Get network provider and web3 instance.
        // See utils/getWeb3 for more info.
        try {
            let results = await getWeb3;
            if (!results || !results.web3) {
                throw new Error('Error finding web3.');
            }

            // Setup a filter for the latest block
            const latestFilter = results.web3.eth.filter('latest');

            this.setState({
                web3: results.web3,
                latestFilter: latestFilter
            });

            // Instantiate contract once web3 provided.
            this.instantiateContract();

        } catch (err) {
            let {message = 'Error finding web3.'} = err;

            console.log(message);

            Alert.error(message);
        }
    }

    /**
     * This function instantiate the smart contract used for voting
     * @returns {Promise.<void>}
     */
    async instantiateContract() {
        /*
         * SMART CONTRACT EXAMPLE
         *
         * Normally these functions would be called in the context of a
         * state management library, but for convenience I've placed them here.
         */

        const contract = require('truffle-contract');
        const voteContract = contract(VoteContract);
        voteContract.setProvider(this.state.web3.currentProvider);

        this.state.web3.eth.getAccounts(async (error, accounts) => {
            let instance = await voteContract.deployed();
            let account = accounts[0];

            this.setState({
                alreadyVote: await instance.alreadyVote({from: account})
            });

            try {
                // If there is no vote, throws a require in the smart contract, we need to catch the throw
                this.setState({
                    myVote: await instance.myVote({from: account}) ? voteYes : voteNo
                });
            } catch (err) {

            }

            this.setState({
                contractInstance: instance
            });

            this.setState({
                account: account
            });

            let votesForNo = await instance.getVotedNo({from: account});
            let votesForYes = await instance.getVotedYes({from: account});

            this.setState({
                quantityOfVoteForNo: votesForNo.toNumber(),
                quantityOfVoteForYes: votesForYes.toNumber()
            });

            // In react when you hide or show a component we need to wait until state of variables are triggered
            setTimeout(() => {
                this.setState({
                    hidden: ""
                });
            }, 100);
        })

    }

    /**
     * Handle submit form and interact with smart contract
     * @param event
     */
    async handleClick(vote) {
        event.preventDefault();
        try {

            this.setState({
                buttonSubmitted: true
            });

            // Handle yes
            let result;
            if (vote === voteYes) {
                result = await this.state.contractInstance.voteYes({
                    from: this.state.account,
                    value: this.state.web3.toWei(0.01, "ether")
                });
            }

            // Handle no
            if (vote === voteNo) {
                result = await this.state.contractInstance.voteNo({
                    from: this.state.account,
                    value: this.state.web3.toWei(0.01, "ether")
                });
            }

            // Set hash transaction
            if (result && result.tx) {
                this.setState({
                    txHash: result.tx
                });
            }

            const {latestFilter, web3} = this.state;

            latestFilter.watch((error, result) => {
                if (error) {
                    console.error(error);
                } else {
                    let thisTx = this.state.txHash;
                    console.log(`State transaction for vote ${thisTx}`);

                    web3.eth.getBlock('latest', async (e, res) => {
                        let {transactions} = res;

                        transactions.map(async (transaction) => {
                            if (thisTx !== transaction) {
                                return transaction;
                            }

                            console.log("Got match!");

                            let myVote = await this.state.contractInstance.myVote({from: this.state.account}) ? voteYes : voteNo;
                            let votesForNo = await this.state.contractInstance.getVotedNo({from: this.state.account});
                            let votesForYes = await this.state.contractInstance.getVotedYes({from: this.state.account});

                            this.setState({
                                myVote: myVote,
                                quantityOfVoteForNo: votesForNo.toNumber(),
                                quantityOfVoteForYes: votesForYes.toNumber()
                            });

                            return transaction;
                        })
                    });
                }

                this.setState({
                    alreadyVote: true,
                    buttonSubmitted: false
                });

                Alert.success('Vote succesfully submitted');
            })

        } catch (err) {
            console.error(err);
            this.setState({
                buttonSubmitted: false
            });
            Alert.error(err.message);
        }
    }

    /**
     * Function to render the results
     * @returns {boolean}
     */
    renderAlreadyVoteWhenTrue() {
        return (
            < div
        id = "parent" >
            < legend > Your
        vote < /legend>
        < pre > You
        already
        vote
        !Your
        vote
        was
        for <
        strong > {this.state.myVote
    }<
        /strong></
        pre >
        < /div>
    )
    }

    /**
     * Function to render the form to vote
     * @returns {boolean}
     */
    renderAlreadyVoteWhenFalse() {
        return (
            < div
        id = "parent" >
            < ButtonToolbar >
            < Button
        disabled = {this.state.buttonSubmitted
    }
        onClick = {(e)
    =>
        this.handleClick(voteYes)
    }
        color = "primary" > Vote
        for yes < /Button>
            < Button disabled = {this.state.buttonSubmitted
    }
        onClick = {(e)
    =>
        this.handleClick(voteNo)
    }
        color = "primary" > Vote
        for no < /Button>
            < /ButtonToolbar>
            < /div>
        )
            }

    /**
     * Render the template, if the user already vote render the results or the poll
     * @returns {boolean}
     */
    render() {
        return (
            < Container >
            < Jumbotron >
            < h2
        className = "display-3" > Dapp
        for voting < /h2>
            < p className = "lead" > This
        is
        a
        simple
        decentralized
        application
        to
        be
        able
        to
        vote in a
        binary
        way. < /p>
        < /Jumbotron>

        < legend > Voting
        results < /legend>
        < ListGroup >
        < ListGroupItem > Number
        of
        voters
        per
        yes: <
        strong > {this.state.quantityOfVoteForYes
    }<
        /strong></
        ListGroupItem >
        < ListGroupItem > Number
        of
        voters
        per
        no: <
        strong > {this.state.quantityOfVoteForNo
    }<
        /strong></
        ListGroupItem >
        < /ListGroup>

        < div
        className = {this.state.hidden
    }>
        {
            this.state.alreadyVote ? this.renderAlreadyVoteWhenTrue() : this.renderAlreadyVoteWhenFalse()
        }
    <
        /div>

        < Alert
        stack = {
        {
            limit: 1
        }
    }
        timeout = {10000}
        />
        < /Container>


    )
        ;
    }
}

export default App;
