import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

/**
 * The display container for a quiz instance
 * @see QuizContainer
 */
class QuizDisplay extends Component {
  render() {
    const {classes, children} = this.props
    return (
      <Paper className={classes.root}>
        <Grid container className={classes.container} spacing={0} justify={'center'} alignItems={'center'}>
          {children}
        </Grid>
      </Paper>
    )
  };
}

QuizDisplay.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node.isRequired
};

export default withStyles(styles)(QuizDisplay);
