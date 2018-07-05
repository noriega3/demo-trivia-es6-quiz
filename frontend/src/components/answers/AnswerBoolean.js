import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash'

class AnswerBoolean extends Component {
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
      <div className="question">
        <div>{question}</div>
        <div>{this.quizAnswer()}</div>
      </div>
    );
  }
}

AnswerBoolean.propTypes = {
  data: PropTypes.object.isRequired
}
export default AnswerBoolean;
