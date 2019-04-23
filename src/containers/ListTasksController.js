import React, { Component } from 'react';
import Layout from '../components/Layout';
import Table from '../components/Table';
import AddTaskForm from '../components/AddTaskForm';




class ListTasksController extends Component {


    render() {

        return (
            <Layout>
                <Table />
                <AddTaskForm/>
            </Layout>
        )
    }
}


export default ListTasksController;