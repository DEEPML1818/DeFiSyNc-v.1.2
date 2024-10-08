require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    scroll: {
      url: process.env.SCROLL_TESTNET_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
    manta: {
      url: process.env.MANTA_TESTNET_RPC_URL,
      accounts: [process.env.PRIVATE_KEY]
    },
  },
};
