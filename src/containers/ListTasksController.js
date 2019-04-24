import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { Button, TextField } from '@material-ui/core';
import Layout from '../components/Layout';
import TableTasks from '../components/TableTasks';
import TaskForm from '../components/TaskForm';
import * as actions from '../store/actions/index';
import AlertDialog from '../components/AlertDialog';

const styles = theme => ({
    actionButton: {
        marginTop: '30px',
        marginLeft: '6px',
        marginRight: '6px',
        width: '140px'
    },
    formElement: {
        marginTop: '50px'
    }
});


class ListTasksController extends Component {

    state = {
        open: false,
        editTask: {},
        searchText: "",
        tasksContainsSearchText: [],
        openAlertDialog: false
    };

    componentDidMount() {
        this.props.onFetchAllTasks();
    }

    onDeleteTaskAlert = () => {
        this.setState({ openAlertDialog: true });
        //this.props.onDeleteTasks(tasksIdForDelete);
    }

    onDeleteAlertAnswer = (answer) => {
        if (answer) {
            const tasksForDelete = this.props.tasks.filter(el => el.selected);
            const tasksIdForDelete = tasksForDelete.map(el => {
                return el.dbId;
            });
            this.props.onDeleteTasks(tasksIdForDelete);
        }
        this.setState({ openAlertDialog: false })
    }

    handleEditTask = (id) => {
        const task = this.props.tasks.find(el => {
            return el.id === id
        });
        this.setState({ editTask: task });
        this.props.onModalStateChanged();
    }

    onSearchInputChange = (event) => {
        const searchText = event.target.value;
        const tasksContainsSearchText = this.filterIt(this.props.tasks, searchText);
        this.setState({ searchText: searchText, tasksContainsSearchText: tasksContainsSearchText })
    }

    filterIt = (arr, search) => {
        return arr.filter(obj => Object.values(obj).some(val => val.toString().includes(search)));
    }

    handleNewTask = () => {
        this.setState({ editTask: null });
        this.props.onModalStateChanged();
    };


    render() {

        const { classes } = this.props;

        return (
            <Layout>
                <TextField
                    id="searchTasks"
                    label="Search Tasks"
                    className={classes.formElement}
                    type="string"
                    name="searchTasks"
                    margin="normal"
                    variant="outlined"
                    onChange={this.onSearchInputChange}
                />
                <TableTasks tasks={this.props.tasks}
                    tasksContainsSearchText={this.state.tasksContainsSearchText}
                    onEditTask={id => this.handleEditTask(id)}
                />
                <TaskForm editTask={this.state.editTask} />
                <Button variant="contained"
                    color="primary"
                    onClick={this.handleNewTask}
                    className={classes.actionButton}
                >
                    Add Task
                </Button>
                <Button variant="contained"
                    color="primary"
                    className={classes.actionButton}
                    onClick={this.onDeleteTaskAlert}
                >
                    Delete Tasks
                </Button>
                <AlertDialog
                    openAlertDialog={this.state.openAlertDialog}
                    onAnswerSelected={this.onDeleteAlertAnswer}
                >
                </AlertDialog>
            </Layout>
        )
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.task.tasks
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchAllTasks: () => dispatch(actions.fetchAllTasks()),
        onModalStateChanged: () => dispatch(actions.modalStateChanged()),
        onDeleteTasks: (ids) => dispatch(actions.deleteTasks(ids))
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(ListTasksController)
