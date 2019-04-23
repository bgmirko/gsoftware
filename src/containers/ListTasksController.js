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
        open: false
    };

    componentDidMount() {
        this.props.onFetchAllTasks();
    }

    onDeleteTask = () => {
        console.log("delete");
        const tasksForDelete = this.props.tasks.filter(el => {
            if(el.selected) return el.dbId;
        })
        const tasksIdForDelete = tasksForDelete.map(el => {
            return el.dbId;
        });
        console.log(tasksIdForDelete);
        this.props.onDeleteTasks(tasksIdForDelete);
    }

    handleOpen = () => {
        this.props.onModalStateChanged();
    };

    render() {

        const { classes } = this.props;

        return (
            <Layout>
                <TableTasks tasks={this.props.tasks} />
                <AddTaskForm
                />
                <Button variant="contained"
                    color="primary"
                    onClick={this.handleOpen}
                    className={classes.actionButton}
                >
                    Add Task
                </Button>
                <Button variant="contained"
                    color="primary"
                    className={classes.actionButton}
                >
                    Edit Task
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