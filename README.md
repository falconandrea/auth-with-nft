# Auth with NFT

## Info about the project

This is my Final Project for complete my bootcamp on [Alchemy University](https://university.alchemy.com/).

My idea is to create a simple login page with NFT with the followed steps:

- The User have to request to be added to the Whitelist
- If the admin accept the candidation of the user, he is going to add the address inside the Whitelist contract
- Now the user can mint the NFT to get the token to access.

The User address is saved on a Google Sheet file, the admin have to insert manually inside the Whitelist contract throught Etherscan write contract functions.
When the User try to mint the NFT, the Login NFT contract is going to communicate with the Whitelist contract to check if the User can mint.

## Getting Started

### Run the application

Run the commands for install packages and run the env:

```bash
# Copy env.example file
cp .env.example .env

# Install packages
npm install

# Run dev env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Compile .env file

- `NEXT_PUBLIC_NETWORK_CHAINID` and `NEXT_PUBLIC_NETWORK_CHAINNAME` are used to front-end check for verify if the User is used the right chain
- `PRIVATE_KEY` is your MetaMask private key ([here](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key) a guide to see how to export the key)
- `NETWORK_RPC` RPC link to connect to the chain, you can get free subscribe on [Alchemy](https://alchemy.com)
- `JWT_SECRET` is a random string used as secret for the JWT
- `ETHERSCAN_KEY` is an apikey created on Etherscan for validate the contracts

### Create and config the Google Sheets file to store addresses

1. Create project and API on [Google Cloud Console](https://console.cloud.google.com/)
2. Download the API Key in JSON format and get private key and client email and put inside the `.env` file inside `GOOGLE_SHEETS_PRIVATE_KEY`, `GOOGLE_SHEETS_CLIENT_EMAIL` and `GOOGLE_DRIVE_SPREADSHEET` variables
3. Create a Sheet file on your Drive and get the ID of the sheet from the URL and put inside the `.env` file
4. The script read/write only in column `A`

### Deploy contracts

The project was created to work on Goerli network, but with some updates you can move on Mainnet Chain.

Deploy the contracts with the command:

```bash
npx hardhat run scripts/deploy.js --network goerli
```

Get the contract address and add them to `.env` file (`NEXT_PUBLIC_WHITELIST_ADDRESS` and `NEXT_PUBLIC_LOGIN_NFT_ADDRESS`), and verify the contracts with the commands:

```bash
npx hardhat verify --network goerli [NEXT_PUBLIC_WHITELIST_ADDRESS]
npx hardhat verify --network goerli [NEXT_PUBLIC_LOGIN_NFT_ADDRESS]
```
