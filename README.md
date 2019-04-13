# PINES AND ELECTRONICS - DAO


## Checklist before running

- cd into the repo and do npm install
- create an .env file inside of the repo folder. It should have the following variables:
``` sh
API_KEY="your infure api key"
MNEMONIC="mnemonic" # Make sure you have some eth
```
- cd into the client folder and run npm install as well.

## Compile and migrate

cd into the main repo folder and run the following commands to deploy the contract to the rinkeby network.

``` bash
truffle compile
truffle migrate --network rinkeby
```

then run the frontend by starting the react application

``` bash
cd client
npm start
```
