require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.16",
  defaultNetwork: "localhost",
  loggingEnabled:true,
  networks: {
    localhost: {},
    forkingMainnet: {
      url: "http://127.0.0.1:8545",
      forking: {
        url: process.env.ETHEREUM_MAINNET_RPC,
        blockNumber: 15058412,
      },
    },
  },
};
