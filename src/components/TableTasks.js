import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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
});

let id = 0;
function createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
}


class TableTasks extends Component {

    state = {
        page: 0,
        rowsPerPage: 5,
    }

    handleChangePage = (event, page) => {
        this.setState({ page: page });
    }

    // handleChangeRowsPerPage = () => {

    // }

    render() {

        let rows = [];
        let tasksLength = 0;
        if (this.props.tasks) {
            const { page, rowsPerPage } = this.state;
            tasksLength = this.props.tasks.length;
            rows = this.props.tasks.slice((page * rowsPerPage), (page * rowsPerPage) + rowsPerPage).map(el => {
                return (
                    <TableRow key={el.dbId}>
                        <TableCell component="th">{el.id}</TableCell>
                        <TableCell align="left">{el.jobTitle}</TableCell>
                        <TableCell align="left">{el.jobDescription}</TableCell>
                        <TableCell align="left">{el.date}</TableCell>
                    </TableRow>
                )
            })
        }

        const { classes } = this.props;

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
                    //onChangeRowsPerPage={handleChangeRowsPerPage}
                    rowsPerPageOptions={[2]}
                />

            </Paper>
        )

    }


}

TableTasks.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableTasks);