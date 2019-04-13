import React, { Component } from "react"
import CarControllerContract from "./contracts/CarController.json"
import getWeb3 from "./utils/getWeb3"

import "./App.css";

// Custom Components
import CameraController from './components/CameraController'
import StatusBox from './components/StatusBox'
import Joystick from './components/Joystick'
import Display from './components/Display'

class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			storageValue: 0,
			web3: null,
			accounts: null,
			contract: null,
			eventHandler: null
		}

		this.sendCommand = this.sendCommand.bind(this)

	}

	componentDidMount = async () => {
		try {
			// Get network provider and web3 instance.
			const web3 = await getWeb3();

			// Use web3 to get the user's accounts.
			const accounts = await web3.eth.getAccounts();

			// Get the contract instance.
			const networkId = await web3.eth.net.getId();
			const deployedNetwork = CarControllerContract.networks[networkId];

			const instance = new web3.eth.Contract(
				CarControllerContract.abi,
				deployedNetwork && deployedNetwork.address,
			);

			// instance.events.CarCommandSent({
			// 	filter: {}, // Using an array means OR: e.g. 20 or 23
			// 	fromBlock: 0
			// }, (error, event) => { console.log(event); })
			// 	.on('data', (event) => {
			// 		console.log(event); // same results as the optional callback above
			// 	})
			// 	.on('changed', (event) => { }).on('error', console.error);

			// Set web3, accounts, and contract to the state, and then proceed with an
			// example of interacting with the contract's methods.
			this.setState({ web3, accounts, contract: instance })

		} catch (error) {
			// Catch any errors for any of the above operations.
			alert(
				`Failed to load web3, accounts, or contract. Check console for details.`,
			);
			console.error(error);
		}
	};

	async sendCommand(command) {
		const { accounts, contract } = this.state;

		try {
			const txHash = await contract.methods.sendCommand(command).send({ from: accounts[0] })
			console.log(JSON.stringify(txHash))
		} catch (e) {
			console.log(e)
		}
	}

	// https://github.com/MetaMask/metamask-extension/issues/5425 
	runExample = async () => {
		const { accounts, contract } = this.state;

		try {

			// Stores a given value, 5 by default.
			// const txHash = await contract.methods.set(4).send({ from: accounts[0]})
			// console.log("valueOf txHash: " + txHash)

			// var txHash = await contract.methods.putSomething(8).send({ from: accounts[0] })
			// console.log("txHash: "+txHash)


			const txHash = contract.methods.sendCommand("hey").send({ from: accounts[0] })

			console.log(JSON.stringify(txHash))

			// let eventHandler
			// console.log(contract.CarCommandSent)
			// eventHandler = contract.events.CarCommandSent({fromBlock: 0, toBlock: 'latest'});

			// a list for saving subscribed event instances
			// const subscribedEvents = {}
			// const subscribeLogEvent = (contract, eventName) => {
			// 	const eventJsonInterface = web3.utils._.find(
			// 		contract._jsonInterface,
			// 		o => o.name === eventName && o.type === 'event',
			// 	)
			// 	const subscription = web3.eth.subscribe('logs', {
			// 		address: contract.options.address,
			// 		topics: [eventJsonInterface.signature]
			// 	}, (error, result) => {
			// 		if (!error) {
			// 			const eventObj = web3.eth.abi.decodeLog(
			// 				eventJsonInterface.inputs,
			// 				result.data,
			// 				result.topics.slice(1)
			// 			)
			// 			console.log(`New ${eventName}!`, eventObj)
			// 		}
			// 	})
			// 	subscribedEvents[eventName] = subscription
			// }
			// subscribeLogEvent(contract, 'Transfer')

			// Get the value from the contract to prove it worked.
			contract.methods.get().call().then(response => {
				console.log("valueOf: " + response)
				if (response !== null) {
					this.setState({ storageValue: response });
				}
			}).catch((e) => {

			});

		} catch (e) {
			console.log(e)
		}
	};

	render() {
		if (!this.state.web3) {
			return <div>Loading Web3, accounts, and contract...</div>;
		}
		return (
			<div className="App"  >
				{/* <div style={{ display: "block" }} onClick={this.runExample}>do stuff</div> */}
				{/* <div>The stored value is: {this.state.storageValue.toString()}</div> */}
				<StatusBox sendCommand={this.sendCommand} />
				<CameraController sendCommand={this.sendCommand} /> {/*  */}
				<Joystick sendCommand={this.sendCommand} />
				<Display />
			</div>
		)
	}
}

export default App;
