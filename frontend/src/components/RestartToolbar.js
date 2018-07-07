import PropTypes from 'prop-types'
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center'
  }
});

/***
 * The restart bar on the bottom of score display, but could be used elsewhere if needed
 * @see ScoreDisplay
 */
class RestartToolbar extends Component {
  render() {
    const {classes, onRestart, restartText, newQuizText} = this.props;
    return (
      <Grid item xs={12} className={classes.root}>
        <Button variant={'contained'} color={"primary"} size={'large'} onClick={() => onRestart()}>{restartText}</Button>&nbsp;
        <Button variant={'contained'} color={"primary"} size={'large'} onClick={() => onRestart('new')}>{newQuizText}</Button>
      </Grid>
    );
  }
}

RestartToolbar.defaultProps = {
  restartText: 'Restart',
  newQuizText: 'Reshuffle and Start'
};

RestartToolbar.propTypes = {
  classes: PropTypes.object,
  onRestart: PropTypes.func.isRequired,
  restartText: PropTypes.string,
  newQuizText: PropTypes.string,
};

export default withStyles(styles)(RestartToolbar);
