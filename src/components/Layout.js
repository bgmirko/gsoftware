import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, Typography, CssBaseline } from '@material-ui/core';

const styles = {
    root: {
        flexGrow: 1,
    },
};

const layout = (props) => {

    const { classes } = props;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        Tasks List
                    </Typography>
                </Toolbar>
            </AppBar>
            {props.children}
        </div>
    )

}

layout.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(layout);