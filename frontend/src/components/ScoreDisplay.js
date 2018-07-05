import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({


});

class ScoreDisplay extends Component {
  render() {
    const {questionNumber, classes, question} = this.props
    return (
      <div>
        <div>Your Score</div>
        <div>{this.props.score}</div>
        <div>{this.props.correct} correct out of {this.props.numQuestions} questions</div>
      </div>
    );
  }
}

ScoreDisplay.defaultProps = {
  score: 0,
  correct: -1,
  numQuestions: -1
}

ScoreDisplay.propTypes = {
  score: PropTypes.number.isRequired,
  correct: PropTypes.number,
  numQuestions: PropTypes.number
}
export default withStyles(styles)(ScoreDisplay);
