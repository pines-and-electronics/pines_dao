import React from 'react'

import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

function scale(num, in_min, in_max, out_min, out_max) {
	return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

class CameraController extends React.Component{

	handleCameraValue(value){
		console.log("value is: "+value)
		var mapped = scale(value, 0, 100, -45, 45)
		console.log("arm_axis_x_"+mapped.toString()+"_arm_axis_y_0")
		this.props.sendCommand("arm_axis_x_"+mapped.toString()+"_arm_axis_y_0") // Same work
	}

	render(){
		return <div style={{
			position: "absolute ",
			width: "50px",
			height: "200px",
			bottom: "50px",
			left: "50px",
			zIndex: "100"
		}}>
			<Slider
				vertical
				onAfterChange={(value)=>{this.handleCameraValue(value)}}
				defaultValue={50}
			/>
		</div>
	}
}

export default CameraController
