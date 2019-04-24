import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { Button } from '@material-ui/core';
import Layout from '../components/Layout';
import TableTasks from '../components/TableTasks';
import AddTaskForm from '../components/AddTaskForm';
import * as actions from '../store/actions/index';

const styles = theme => ({
    actionButton: {
        marginTop: '30px',
        marginLeft: '6px',
        marginRight: '6px',
        width: '140px'
    }
});


class ListTasksController extends Component {

    state = {
        open: false,
        editTask: {}
    };

    componentDidMount() {
        this.props.onFetchAllTasks();
    }

    onDeleteTask = () => {
        const tasksForDelete = this.props.tasks.filter(el => {
            if(el.selected) return el.dbId;
        })
        const tasksIdForDelete = tasksForDelete.map(el => {
            return el.dbId;
        });
        this.props.onDeleteTasks(tasksIdForDelete);
    }

    handleEditTask = (id) => {
        const task = this.props.tasks.find(el => {
            return el.id === id
        });
        this.setState({editTask: task});
        this.props.onModalStateChanged();
    }

    handleNewTask = () => {
        this.setState({editTask: null});
        this.props.onModalStateChanged();
    };

    render() {

        const { classes } = this.props;

        return (
            <Layout>
                <TableTasks tasks={this.props.tasks} 
                    onEditTask = {id => this.handleEditTask(id)}
                    />
                <AddTaskForm editTask={this.state.editTask}/>
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
                    onClick={this.onDeleteTask}
                >
                    Delete Tasks
                </Button>
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

// export default connect(mapStateToProps, mapDispatchToProps)(ListTasksController);