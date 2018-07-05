import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash'
import AnswerMultiple from '../components/answers/AnswerMultiple'
import AnswerInput from '../components/answers/AnswerInput'

class QuizQuestion extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  quizAnswer(){
    const {answerOptions, answer} = this.props
    const type = _.get(answerOptions, 'type')
    switch(type){
      case 'input':
        return <AnswerInput data={answerOptions} onSubmit={(e) => this.handleAnswerSubmit(e)} />
      case 'boolean':
      case 'multiple':
      case 'choice':
        return <AnswerMultiple data={answerOptions} onSubmit={(e) => this.handleAnswerSubmit(e) } />
    }
  }

  handleAnswerSubmit(value){
    this.props.onAnswered(value)
  }

  render() {
    const {question} = this.props.data
    console.log('props', this.props)
    return (
      <div className="question">
          <div>{question}</div>
          <div>{this.quizAnswer()}</div>
      </div>
    );
  }
}

QuizQuestion.propTypes = {
  data: PropTypes.object.isRequired,
  onAnswered: PropTypes.func.isRequired
}
export default QuizQuestion;
