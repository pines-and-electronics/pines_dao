import React from 'react'
import { withStyles } from '@material-ui/core/styles'

var styles = {
	button: {
		// marginTop: "15px",
		width: "100%",
		backgroundColor: "#6CB980",
		borderRadius: "8px",
		height: "40px",
		display: "flex",
		alignItems: "center",
		textAlign: "center",
		alignContent: "center",
		color: '#FFF',
		'&:hover': {
			cursor: "pointer",
			backgroundColor: '#4E77C9'
		}
	}
}

class StatusBox extends React.Component {

	handleSnapshotButtonPressed(){
		console.log("button pressed")
    	this.props.sendCommand("snap")
	}

	handleRegisterButtonPressed(){
		console.log("button pressed")
		this.props.sendCommand("register")
	}

	render() {

		const { classes } = this.props

		return <div style={{
			position: "absolute ",
			width: "150px",
			display: "flex",
			flexDirection: "column",
			top: "30px",
			right: "30px",
			zIndex: "100",
			backgroundColor: "rgba(255, 255, 255, 0.9)",
			borderRadius: "15px",
			color: "#555",
			padding: "15px"
		}}>
			{/* <h3>Status</h3>
			<p> Position: </p>
			<p> Time: 1555164083 </p> */}
			<div
				className={classes.button}
				onClick={() => this.handleSnapshotButtonPressed()}
			>
				<div style={{ width: "100%", display: "block" }}
				>Take Snapshot</div>
			</div>

			<div
				className={classes.button}
				style={{marginTop: "15px"}}
				onClick={() => this.handleRegisterButtonPressed()}
			>
				<div style={{ width: "100%", display: "block" }}
				>Register</div>
			</div>
		</div>
	}
}

export default withStyles(styles)(StatusBox)
