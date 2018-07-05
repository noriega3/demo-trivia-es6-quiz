import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash'

class AnswerInput extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  quizAnswer(){
    const {question} = this.props

  }

  render() {
    const {question} = this.props
    console.log('props', this.props)
    return (
      <div className="answer">
        <input label="your answer" />
      </div>
    );
  }
}
AnswerInput.defaultProps = {
  multiLine: false
}
AnswerInput.propTypes = {
  data: PropTypes.object.isRequired,
  multiLine: PropTypes.bool
}
export default AnswerInput;
