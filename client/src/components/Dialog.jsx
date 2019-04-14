// React
import React from 'react'
import PropTypes from 'prop-types'

// Material UI Stuff
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

import TagCloud from 'react-tag-cloud';
import randomColor from 'randomcolor';


class ConfirmDialog extends React.Component {

	render() {
		const { fullScreen, open, success } = this.props;


		return (
			<div>
				<Dialog
					fullScreen={fullScreen}
					open={open}
					onClose={this.props.handleDialogClose}
					aria-labelledby="responsive-dialog-title"
				>
					<DialogTitle id="responsive-dialog-title">{"Classification results"}</DialogTitle>
					<DialogContent style={{ height: "200px" }}>
						<TagCloud
							style={{
								fontFamily: 'sans-serif',
								fontSize: 30,
								fontWeight: 'bold',
								fontStyle: 'italic',
								color: () => randomColor(),
								padding: 5,
								width: '100%',
								height: '100%'
							}}>
							<div>react</div>
							<div>tag</div>
							<div >ear</div>
							<div>banana</div>
							<div >food</div>
							<div >fruit</div>
							<div >lights</div>
						</TagCloud>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={this.props.handleDialogClose}
							color="primary"
							autoFocus
						>
							Dismiss
			 			</Button>
					</DialogActions>
				</Dialog>
			</div>
		)
	}
}

ConfirmDialog.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
}

export default ConfirmDialog