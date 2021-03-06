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

class TaskForm extends Component {

    state = {
        jobTitle: '',
        jobDescription: '',
    };

    componentDidUpdate() {
        const { jobTitle, jobDescription } = this.state;
        if (!this.props.modalOpen && (jobTitle || jobDescription)) {
            this.setState({ jobTitle: '', jobDescription: '' });
        }
    }

    handleClose = () => {
        this.props.onModalStateChanged();
    };

    onTextInputChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onAddTaskSubmit = (event) => {
        event.preventDefault();
        let { jobTitle, jobDescription } = this.state;

        if(this.props.operation === "new"){
            this.props.onSaveNewTask(jobTitle, jobDescription);
        }else if(this.props.operation === "edit"){
            if(!jobTitle) jobTitle = this.props.editTask.jobTitle;
            if(!jobDescription) jobDescription = this.props.editTask.jobDescription;
            this.props.onEditTask(this.props.editTask.dbId, this.props.editTask.id, jobTitle, jobDescription);
            if(this.props.onTaskUpdated){
                this.props.onTaskUpdated(jobTitle, jobDescription);
            }  
        }
        
        this.props.onModalStateChanged();       
    }

    populateData = (input) => {
        const { editTask } = this.props;
        if (input && editTask) {
            if (input.id === 'jobTitle') {
                input.value = editTask.jobTitle;
            } else if (input.id === 'jobDescription') {
                input.value = editTask.jobDescription;
            }
        }
    }

    render() {

        const { classes, modalOpen } = this.props;

        return (
            <React.Fragment>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={modalOpen}
                    onClose={this.handleClose}>
                    <div className={classes.paper}>
                        <form method='POST' className={classes.form} onSubmit={this.onAddTaskSubmit}>
                            <div className={classes.fields}>
                                <TextField
                                    inputRef={input => { this.populateData(input) }}
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
                                    inputRef={input => { this.populateData(input) }}
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
                                <Button type="submit" variant="contained" color="primary" className={classNames(classes.formElement, classes.button)}>Save Task</Button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        modalOpen: state.task.modalOpen
    };
}

const mapDispatchToProps = dispatch => ({
    onSaveNewTask: (jobTitle, jobDescription) => dispatch(actions.saveNewTask(jobTitle, jobDescription)),
    onEditTask: (dbId, id, jobTitle, jobDescription) => dispatch(actions.editTask(dbId, id, jobTitle, jobDescription)),
    onModalStateChanged: () => dispatch(actions.modalStateChanged())
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(TaskForm)