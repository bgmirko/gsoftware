import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../components/Layout';
import TableTasks from '../components/TableTasks';
import AddTaskForm from '../components/AddTaskForm';
import * as actions from '../store/actions/index';




class ListTasksController extends Component {

    componentDidMount(){
        this.props.onFetchAllTasks()
    }

    render() {

        return (
            <Layout>
                <TableTasks tasks={this.props.tasks}/>
                <AddTaskForm/>
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
        onFetchAllTasks: () => dispatch(actions.fetchAllTasks())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListTasksController);