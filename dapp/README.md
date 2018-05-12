# React Truffle Box

This box comes with everything you need to start using smart contracts from a react app. This is as barebones as it gets, so nothing stands in your way.

## Installation
1. Clone the repository

2. Install Truffle globally.
    ```bash
    $ npm install -g truffle
    ```

3. Move to the dapp directory on a terminal
    ```bash
    $ cd dapp
    ```

4. Run the development console.
    ```bash
    $ truffle develop
    ```

5. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    compile
    migrate
    ```
    Possible problem 'Attempting to run transaction which calls a contract function, but recipient address..blablabla' run
    ```javascript
    migrate --reset
    ```
    
    Another option is to run on the dapp directory, the following command:
    ```bash
    $ truffle compile 
    $ truffle migrate --reset --network development
    ```

6. Run the webpack server for front-end hot reloading (outside the development console). Smart contract changes must be manually recompiled and migrated.
    ```bash
    $ cd dapp
    // Serves the front-end on http://localhost:3000 , please disable metamask to run nicely
    $ npm run start
    ```

7. Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the development console.
    ```javascript
    // If inside the development console.
    test

    // If outside the development console..prefer option!
    $ truffle test
    ```

8. Jest is included for testing React components. Compile your contracts before running Jest, or you may receive some file not found errors.
    ```bash
    // Run Jest outside of the development console for front-end component tests.
    $ npm run test
    ```

9. To build the application for production, use the build command. A production build will be in the build_webpack folder.
    ```bash
    $ npm run build
    ```

10. Problem with "error watching file for changes: EMFILE" when install test, please install watchman
    ```bash
    $ brew install watchman
    ```

## Using ganache

1. Clone the repository

2. Install Truffle globally.
    ```bash
    $ npm install -g truffle
    ```

3. Move to the dapp directory on a terminal
    ```bash
    $ cd dapp
    $ npm install
    ```
    
4. Install ganache and execute it

5. Execute on the console 
    ```bash
    $ truffle compile 
    $ truffle migrate --reset --network development
    ```
6. Run the webpack server for front-end hot reloading (outside the development console). Smart contract changes must be manually recompiled and migrated.
    ```bash
    $ cd dapp
    // Serves the front-end on http://localhost:3000 
    $ npm run start
    ```
7. Enable metamask, configure it to connect to ganache

8. Add existing accounts in ganache, create them in metamask

9. Reload localhost:3000 and use it

## FAQ

* __How do I use this with the EthereumJS TestRPC?__

    It's as easy as modifying the config file! [Check out our documentation on adding network configurations](http://truffleframework.com/docs/advanced/configuration#networks). Depending on the port you're using, you'll also need to update line 24 of `src/utils/getWeb3.js`.

* __Why is there both a truffle.js file and a truffle-config.js file?__

    `truffle-config.js` is a copy of `truffle.js` for compatibility with Windows development environments. Feel free to it if it's irrelevant to your platform.

* __Where is my production build?__

    The production build will be in the build_webpack folder. This is because Truffle outputs contract compilations to the build folder.

* __Where can I find more documentation?__

    This box is a marriage of [Truffle](http://truffleframework.com/) and a React setup created with [create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md). Either one would be a great place to start!
