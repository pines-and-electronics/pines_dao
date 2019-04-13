const path = require("path")
var HDWalletProvider = require("truffle-hdwallet-provider")

require('dotenv').config()

var mnemonic = process.env.MNEMONIC

module.exports = {
	contracts_build_directory: path.join(__dirname, "client/src/contracts"),
	networks: {
		rinkeby: {
			provider: function () {
				return new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${process.env.API_KEY}`);
			},
			network_id: '4',
		},
		test: {
			provider: function () {
				return new HDWalletProvider(mnemonic, "http://127.0.0.1:8545/")
			},
			network_id: '*',
		},
		// development: {
		// 	host: "127.0.0.1",
		// 	port: 8545,
		// 	network_id: "*", // match any network
		// 	websockets: true
		// },
	}
}
