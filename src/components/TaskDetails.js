import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Paper, Button } from '@material-ui/core';
import * as actions from '../store/actions/index';
import TaskForm from './TaskForm';
import AlertDialog from './AlertDialog';
import Layout from '../components/Layout';

const styles = {
    paper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 'auto',
        marginTop: '50px',
        padding: '30px',
        width: '35vw'
    },
    buttonContainer: {
        display: 'flex'
    },
    actionButton: {
        fontSize: '12px',
        margin: '5px',
        width: '70px',
        marginBottom: '20px'
    }
};

class TaskDetails extends Component {

    state = {
        task: {},
        editTask: {},
        openAlertDialog: false
    }

    componentDidMount() {

        const query = new URLSearchParams(this.props.location.search);
        let id = null;

        for (let param of query.entries()) {
            if (param[0] === "id") id = param[1];
        }

        const task = this.props.tasks.find(el => {
            return el.id.toString() === id;
        })

        this.setState({ task: task });
    }
    

    handleEditTask = () => {
        this.props.onModalStateChanged();
    };

    onDeleteTaskAlert = () => {
        this.setState({ openAlertDialog: true });
    }

    onDeleteAlertAnswer = (answer) => {
        if (answer) {
            this.props.onDeleteTasks([this.state.task.dbId]);
            this.props.history.push({pathname: "/"});
        }
        this.setState({ openAlertDialog: false });
       
    }

    render() {

        const { task } = this.state;
        const { classes } = this.props;

        console.log("render");

        if (task) {
            return (
                <div>
                    <Layout />
                    <Paper className={classes.paper}>
                        <p>{`Date: ${task.dateFormated} \u00A0\u00A0 Time: ${task.time}`}</p>
                        <h2>{task.jobTitle}</h2>
                        <p>{task.jobDescription}</p>
                        <div className={classes.buttonContainer}>
                            <Button variant="contained"
                                color="primary"
                                onClick={this.handleEditTask}
                                className={classes.actionButton}
                            >
                                Edit
                        </Button>
                            <Button variant="contained"
                                color="primary"
                                className={classes.actionButton}
                                onClick={this.onDeleteTaskAlert}
                            >
                                Delete
                        </Button>
                        </div>
                        <Link to="/">Home</Link>
                    </Paper>
                    <TaskForm 
                        editTask={this.state.task} 
                        dbId={this.state.task.dbId}
                        operation="edit"
                        />
                    <AlertDialog
                        openAlertDialog={this.state.openAlertDialog}
                        onAnswerSelected={this.onDeleteAlertAnswer}>
                    </AlertDialog>
                </div>

            )
        } else {
            return (
                <Fragment>
                    <Layout />
                    <Paper className={classes.paper}>
                        <p>No data</p>
                        <Link to="/">Home</Link>
                    </Paper>
                </Fragment>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.task.tasks
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onModalStateChanged: () => dispatch(actions.modalStateChanged()),
        onDeleteTasks: (ids) => dispatch(actions.deleteTasks(ids))
    }
}

TaskDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(TaskDetails)


