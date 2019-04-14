import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import backgroundImg from '../assets/dummy.jpg'

var styles = {
	displayStyle: {
		position:'relative',
		width:'100%',
		height:'100%',
		backgroundImage: `url(${backgroundImg})`,
		backgroundPosition: 'center center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat'
	}
}

class Display extends React.Component {

	render() {

		const { classes } = this.props

		return <div className={classes.displayStyle}>
		</div>
	}
}

export default withStyles(styles)(Display)
