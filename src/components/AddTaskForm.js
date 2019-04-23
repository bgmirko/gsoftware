import React, { Component } from 'react';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    paper: {
        position: 'absolute',
        top: 'calc(50vh - 170px)',
        left: 'calc(50vw - 200px)',
        height: '360px',
        width: '400px',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
    addTaskButton: {
        marginTop: '30px'
    }
});

class AddTaskForm extends Component {

    state = {
        open: false,
    };

    getAlert() {
        alert('getAlert from Child');
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {

        const { classes } = this.props;

        return (
            <React.Fragment>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                    openModal={() => this.handleOpen()}
                >
                    <div className={classes.paper}>
                        <p>Modal je otvoren</p>
                    </div>
                </Modal>
                <Button variant="contained"
                    color="primary"
                    onClick={this.handleOpen}
                    className={classes.addTaskButton}
                >
                    Add Task
                </Button>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(AddTaskForm);