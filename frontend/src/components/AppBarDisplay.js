import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
};

/***
 * The header for entire app
 * @see App
 */
class AppBarDisplay extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Quiz Assignment
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

AppBarDisplay.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBarDisplay);
