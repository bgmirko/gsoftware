import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Paper } from '@material-ui/core';
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
    }
};

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
            return el.id.toString() === id;
        })

        this.setState({ task: task });
    }

    render() {

        const { task } = this.state;
        const { classes } = this.props;

        if (task) {
            return (
                <div>
                    <Layout />
                    <Paper className={classes.paper}>
                        <p>{`Date: ${task.dateFormated} \u00A0\u00A0 Time: ${task.time}`}</p>
                        <h2>{task.jobTitle}</h2>
                        <p>{task.jobDescription}</p>
                        <Link to="/">Home</Link>
                    </Paper>
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

TaskDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps)
)(TaskDetails)
