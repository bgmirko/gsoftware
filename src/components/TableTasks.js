import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as actions from '../store/actions/index';

import { Paper, Table, TableBody, TableCell, TableHead, TableRow, TablePagination } from '@material-ui/core';

const styles = theme => ({
    root: {
        width: '1200px',
        margin: '0 auto',
        marginTop: theme.spacing.unit * 6,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    tableRowSelected: {
        backgroundColor: "#ffe6cc !important"
    }
});



class TableTasks extends Component {

    state = {
        page: 0,
        rowsPerPage: 5
    }

    handleChangePage = (event, page) => {
        this.setState({ page: page });
    }

    handleRowClick = (event) => {
        const id = event.target.parentElement.childNodes[0].firstChild.data
        this.props.onTableRowClicked(id)
    }

    render() {

        const { classes } = this.props;

        let rows = [];
        let tasksLength = 0;
        if (this.props.tasks) {
            const { page, rowsPerPage } = this.state;
            tasksLength = this.props.tasks.length;
            rows = this.props.tasks.slice((page * rowsPerPage), (page * rowsPerPage) + rowsPerPage).map(el => {
                return (
                    <TableRow
                        key={el.dbId}
                        onClick={this.handleRowClick}
                        className={el.selected ? classes.tableRowSelected : null}>
                        <TableCell component="th">{el.id}</TableCell>
                        <TableCell align="left">{el.jobTitle}</TableCell>
                        <TableCell align="left">{el.jobDescription}</TableCell>
                        <TableCell align="left">{el.date}</TableCell>
                        <TableCell align="left">
                            <button onClick={() => this.props.onEditTask(el.id)}>edit</button>
                            <button>details</button>
                        </TableCell>
                    </TableRow>
                )
            })
        }

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">ID</TableCell>
                            <TableCell align="left">Job Title</TableCell>
                            <TableCell align="left">Job Description</TableCell>
                            <TableCell align="left">Record Created (Date + Time)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={tasksLength}
                    rowsPerPage={this.state.rowsPerPage}
                    page={this.state.page}
                    onChangePage={this.handleChangePage}
                    rowsPerPageOptions={[2]}
                />

            </Paper>
        )

    }


}

TableTasks.propTypes = {
    classes: PropTypes.object.isRequired,
};

//export default withStyles(styles)(TableTasks);

const mapDispatchToProps = dispatch => ({
    onTableRowClicked: (id) => dispatch(actions.tableRowClicked(id))
});

export default compose(
    withStyles(styles),
    connect(null, mapDispatchToProps)
)(TableTasks)