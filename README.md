# Altoros Protofire DApp Test

## Goal

Create a DApp that allows people to vote on a (binary) proposal. Each ethereum
address should be allowed to vote only once and the vote should cost 0.01 ETH.

When a user opens the page, it should see the result so far (number of positive
votes vs. number of negative votes). If the MetaMask account they are using
hasn't voted yet, they should also see two buttons: one for voting "Yes" and one
for "No". If they already voted, they should see their vote instead. Votes
cannot be updated.

The app should consist only of the frontend and the smart contract. There is no
need for a backend.
