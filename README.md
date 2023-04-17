# Auth with NFT

## Info about the project

This is my Final Project for complete my bootcamp on [https://university.alchemy.com/](Alchemy University).
My idea is to create a simple login page with NFT with the followed steps:

- The User have to request to be added to the Whitelist
- If the admin accept the candidation of the user, he is going to add the address inside the Whitelist contract
- Now the user can mint the NFT to get the token to access.

The User address is saved on a Google Sheet file, the admin have to insert manually inside the Whitelist contract throught Etherscan write contract functions.
When the User try to mint the NFT, the Login NFT contract is going to communicate with the Whitelist contract to check if the User can mint.

## Getting Started

### Run the application

Copy `.env.example` to `.env` file.

Run the development server with the command:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Create and config the Google Sheets file to store addresses

1. Create project and API on [Google Cloud Console](https://console.cloud.google.com/)
2. Download the API Key in JSON format and get private key and client email and put inside the `.env` file
3. Create a Sheet file on your Drive and get the ID of the sheet from the URL and put inside the `.env` file
4. The script read/write only in column `A`
