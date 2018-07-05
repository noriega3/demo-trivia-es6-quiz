import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash'

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  answerContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  }
});

class QuestionDisplay extends Component {
  render() {
    const {questionNumber, classes, question} = this.props
    return (
      <div className="question">
        <div>Question {questionNumber}. {question}</div>
      </div>
    );
  }
}
QuestionDisplay.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
}
export default withStyles(styles)(QuestionDisplay);
