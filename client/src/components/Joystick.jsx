import JoyStick from 'react-joystick'
import React from 'react'

function scale(num, in_min, in_max, out_min, out_max) {
	return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

const containerStyle = {
	position: 'absolute',
	bottom:"30px",
	right:"30px",
	height: '170px',
	width: '170px',
	background: 'linear-gradient(to right, #E684AE, #79CBCA, #77A1D3)'
}

class JoyWrapper extends React.Component {
	constructor() {
		super();
		this.managerListener = this.managerListener.bind(this);
	}

	managerListener(manager) {
		var distance = 0;
		var angle = 0;
		manager.on('move', (e, stick) => {
			//this.props.sendCommand("hi")
			//console.log('I moved!')
			try {
				//console.log(stick.direction.angle)
				angle = stick.direction.angle
			} catch (err) {
				console.log(err);
			}
			//console.log(stick.distance)const
			distance = stick.distance
		})
		manager.on('end', () => {
			console.log('I ended!');
			console.log(distance, angle);

			var mapped

			if (angle === "up") {
				console.log('Up detected');
				mapped = scale(distance, 0, 50, 0, 100)
				this.props.sendCommand("linear_" + mapped.toString())
				//console.log(mapped);
			} else if (angle === "down") {
				console.log('down detected');
				mapped = scale(distance, 0, 50, 0, -100)
				this.props.sendCommand("linear_" + mapped.toString())
				//console.log(mapped)
			} else if (angle === "left") {
				console.log('left detected');
				mapped = scale(distance, 0, 50, 0, -100)
				this.props.sendCommand("steer_" + mapped.toString())
				console.log(mapped)
			} else if (angle === "right") {
				console.log('right detected');
				mapped = scale(distance, 0, 50, 0, 100)
				this.props.sendCommand("steer_" + mapped.toString())
				console.log(mapped)
			}
		})
	}

	render() {
		// const { classes } = this.props

		return (
			<JoyStick
				options={{
					// zone:
					mode: "static",
					position: {
						right: '50%',
						bottom: '50%'
					},
					restOpacity: "0.8"
				}}
				containerStyle={containerStyle}
				managerListener={this.managerListener}
			/>
		)
	}
}

export default JoyWrapper
