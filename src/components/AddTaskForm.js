import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
import Modal from '@material-ui/core/Modal';
import { withStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import * as actions from '../store/actions/index';


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
    },
    fields: {
        display: 'flex',
        flexDirection: 'column',
        
        textAlign: 'center',
        margin: '0 auto',
        marginTop: 10,
        width: '80%'
    },
    formElement: {
        margin: 0,
        width: '100%'
    },
    textArea: {
        fontSize: '14px',
        lineHeight: '22px'
    },
    button: {
        marginTop: '15px',
        width: '120px'
    }

});

class AddTaskForm extends Component {

    state = {
        open: false,
        jobTitle: '',
        jobDescription: '',
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onTextInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onAddTaskSubmit = (event) => {
        event.preventDefault();
        const { jobTitle, jobDescription } = this.state;
        this.props.onSaveNewTask(jobTitle, jobDescription);
        this.setState({open: false});
    }

    render() {

        const { classes } = this.props;

        return (
            <React.Fragment>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}>
                    <div className={classes.paper}>
                        <form method='POST' className={classes.form} onSubmit={this.onAddTaskSubmit}>
                            <div className={classes.fields}>
                                <TextField
                                    id="jobTitle"
                                    label="Job Title"
                                    className={classes.formElement}
                                    type="string"
                                    name="jobTitle"
                                    autoComplete="true"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.onTextInputChange}
                                />
                                <TextField
                                    id="jobDescription"
                                    label="Job Description"
                                    multiline={true}
                                    rows={4}
                                    className={classes.textArea}
                                    name="jobDescription"
                                    autoComplete="false"
                                    margin="normal"
                                    variant="outlined"
                                    onChange={this.onTextInputChange}
                                />
                                <Button type="submit" variant="contained" color="primary" className={classNames(classes.formElement, classes.button)}>Add Task</Button>
                            </div>
                        </form>
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

const mapDispatchToProps = dispatch => ({
    onSaveNewTask: (jobTitle, jobDescription) => dispatch(actions.saveNewTask(jobTitle, jobDescription))
});

export default compose(
    withStyles(styles),
    connect(null, mapDispatchToProps)
 )(AddTaskForm)