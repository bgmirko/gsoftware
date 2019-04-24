import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {
    state = {
        open: false,
        delete: false
    };

    componentDidUpdate() {
        if (this.props.openAlertDialog && !this.state.open) {
            this.setState({ open: true, delete: false });
        }
        if (!this.props.openAlertDialog && this.state.open) {
            this.setState({ open: false, delete: true });
        }
    }

    handleAnswer = (answer) => {
        this.props.onAnswerSelected(answer);
    };

    render() {

        return (
            <div>
                <Dialog
                    open={this.state.open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Are you shure?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            You are attempting to delete data
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleAnswer(false)} color="primary">
                            Back
                        </Button>
                        <Button onClick={() => this.handleAnswer(true)} color="primary" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default AlertDialog;