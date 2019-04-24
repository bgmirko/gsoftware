import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';


class TaskDetails extends Component {

    state = {
        task: {}
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        let id = null;
        for (let param of query.entries()) {
            if (param[0] === "id") id = param[1];

        }
        const task = this.props.tasks.find(el => {
            return el.id = id;
        })
        this.setState({ task: task });
    }

    render() {
        const { task } = this.state;
        if (task) {
            return (
                <div>
                    <Layout />
                    <p>{task.date}</p>
                    <h2>{task.jobTitle}</h2>
                    <p>{task.jobDescription}</p>
                    <Link to="/">Home Page</Link>
                </div>

            )
        } else {
            return (
                <Fragment>
                     <Layout />
                    <p>No data</p>
                    <Link to="/">Home Page</Link>
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

export default connect(mapStateToProps)(TaskDetails);