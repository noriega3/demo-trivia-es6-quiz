import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  scoreTitle: {
    textAlign: 'center'
  },
  score: {
    textAlign: 'center'
  },
  sub: {
    textAlign: 'center'
  }
});

class ScoreDisplay extends Component {
  render() {
    const {classes, title, score, correct, numQuestions, scoreSubText, questionsText} = this.props;
    return (
      <div>
        <Typography variant="headline" gutterBottom className={classes.scoreTitle}>
          {title}
        </Typography>
        <Typography variant="display2" gutterBottom className={classes.score}>
          {_.floor(_.multiply(score, 100))}%
        </Typography>
        <Typography variant={"subheading"} gutterBottom className={classes.sub}>
          {_.size(correct)} {scoreSubText} {numQuestions} {questionsText}
        </Typography>
      </div>
    );
  };
}

//TODO: show questions along with those answers

ScoreDisplay.defaultProps = {
  score: 0,
  correct: [],
  incorrect: [],
  numQuestions: 0,
  title: 'Your Score',
  scoreSubText: 'out of',
  questionsText: 'questions correct'
};

ScoreDisplay.propTypes = {
  score: PropTypes.number.isRequired,
  correct: PropTypes.array,
  incorrect: PropTypes.array,
  numQuestions: PropTypes.number,
  title: PropTypes.string,
  scoreSubText: PropTypes.string,
  questionsText: PropTypes.string,
};

export default withStyles(styles)(ScoreDisplay);
