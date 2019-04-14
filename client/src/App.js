import React, { Component } from "react"
import CarControllerContract from "./contracts/CarController.json"
import getWeb3 from "./utils/getWeb3"

import "./App.css";

// Custom Components
import CameraController from './components/CameraController'
import StatusBox from './components/StatusBox'
import Joystick from './components/Joystick'
import Display from './components/Display'
import Dialog from './components/Dialog'

class App extends Component {

	constructor(props) {
		super(props)

		this.state = {
			storageValue: 0,
			web3: null,
			accounts: null,
			contract: null,
			eventHandler: null,
			dialogOpen: false
		}

		this.sendCommand = this.sendCommand.bind(this)
		this.handleDialogClose = this.handleDialogClose.bind(this)

	}

	handleDialogClose() {
		this.setState({ dialogOpen: false })
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

			if(command === 'register'){
				this.setState({dialogOpen:true})
			}
		} catch (e) {
			console.log(e)
		}
	}

	render() {
		if (!this.state.web3) {
			return <div>Loading Web3, accounts, and contract...</div>;
		}
		return (
			<div className="App"  >
				<Dialog
					fullScreen={false}
					open={this.state.dialogOpen}
					handleDialogClose={this.handleDialogClose}
				/>
				<StatusBox sendCommand={this.sendCommand} />
				<CameraController sendCommand={this.sendCommand} />
				<Joystick sendCommand={this.sendCommand} />
				<Display />
			</div>
		)
	}
}

export default App;
