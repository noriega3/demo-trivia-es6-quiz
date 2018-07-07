import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    textAlign: 'center'
  }
});

/***
 * Start button for the initial render of the quiz
 * @see QuizContainer
 */
class StartDisplay extends Component {
  render() {
    const {classes, disabled, onStart, buttonText, headerText} = this.props;
    return (
      <Grid item  className={classes.root}>
        <Typography variant={'display4'} gutterBottom>{headerText}</Typography>
        <div>
          <Button variant={'contained'} size={'large'} color={'primary'} onClick={onStart} disabled={disabled}>{buttonText}</Button>
        </div>
      </Grid>
    );
  };
}

StartDisplay.defaultProps = {
  headerText: 'Const/Let',
  buttonText: 'Begin Quiz',
  disabled: false,
  onStart: () => {}
};

StartDisplay.propTypes = {
  onStart: PropTypes.func,
  disabled: PropTypes.bool,
  headerText: PropTypes.string,
  buttonText: PropTypes.string,
};

export default withStyles(styles)(StartDisplay);
