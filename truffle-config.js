var HDWalletProvider = require("truffle-hdwallet-provider");	// Node package to interact with the contract
var mnemonic ="find electric tomorrow online exist comfort volcano judge service ridge day disagree";
var INFURA_API_KEY = "83764326139348a28efa51e1297031d0";	//API addrsess for the blockchain infrastructure
module.exports = {
  networks: {
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          "https://rinkeby.infura.io/v3/" + INFURA_API_KEY	//Connect to rinkeby test-net using infura API address
        ),
      network_id: 4,
      gas: 3000000,
      gasPrice: 10000000000
    }
  }
};