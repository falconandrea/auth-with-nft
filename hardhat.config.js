require('dotenv').config()
require('@nomicfoundation/hardhat-toolbox')

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.18',
  networks: {
    goerli: {
      url: process.env.NETWORK_RPC,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
}
