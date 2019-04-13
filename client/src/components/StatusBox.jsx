import React from 'react'
import { withStyles } from '@material-ui/core/styles'

var styles = {
	button: {
		width: "100%",
		backgroundColor: "cyan",
		borderRadius: "8px",
		height: "40px",
		display: "flex",
		alignItems: "center",
		textAlign: "center",
		alignContent: "center",
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

	render() {

		const { classes } = this.props

		return <div style={{
			position: "absolute ",
			width: "150px",
			height: "170px",
			top: "30px",
			right: "30px",
			zIndex: "100",
			backgroundColor: "white",
			borderRadius: "15px",
			opacity: "0.8",
			color: "#555",
			padding: "15px"
		}}>
			<h3>Status</h3>
			<p>
				Position:
			</p>
			<p>
				Time: 1555164083
			</p>
			<div
				className={classes.button}
				onClick={() => this.handleSnapshotButtonPressed()}
			>
				<div style={{
					width: "100%",
					display: "block",
				}}
				>Take Snapshot</div>
			</div>
		</div>
	}
}

export default withStyles(styles)(StatusBox)
