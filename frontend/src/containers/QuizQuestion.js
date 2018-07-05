import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash'

import AnswerSingleChoice from '../components/answers/AnswerSingleChoice'
import AnswerMultiChoice from '../components/answers/AnswerMultiChoice'
import AnswerInput from '../components/answers/AnswerInput'
import QuestionDisplay from '../components/QuestionDisplay'

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import {
  getQuestionById
} from '../actions/api'

const styles = theme => ({
  answerContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  }
});


class QuizQuestion extends Component {
  constructor(props){
    super(props)
    this.state = {
      question: undefined
    }

    this.onReceivedQuestion = this.onReceivedQuestion.bind(this)
  }

  handleUserSubmit(ev){
    ev.preventDefault()
    this.props.onSubmit(this.state.userAnswer)
  }

  componentDidMount(){
    const {questionId} = this.props
    getQuestionById({body: questionId}, this.onReceivedQuestion)
  }

  componentDidUpdate(prevProps){
    if(!_.isEqual(prevProps.questionId, this.props.questionId))
      getQuestionById({body: this.props.questionId}, this.onReceivedQuestion)
  }
  onReceivedQuestion(response){
    this.setState({...response})
  }

  renderUserAnswerInput(){
    const {answerOptions} = this.state
    let renderType  = _.get(answerOptions, 'type')
    const choiceMin = _.get(answerOptions, 'userChoiceMin', 1)

    switch(renderType){
      case 'input':
        return <AnswerInput {...answerOptions}
          onSubmit={(e) => this.props.onSubmit(e) }
        />
      case 'boolean':
      case 'multiple':
      case 'choice':
        if(choiceMin > 1)
          return <AnswerMultiChoice {...answerOptions}
            onSubmit={(e) => this.props.onSubmit(e) } />
        else
          return <AnswerSingleChoice {...answerOptions}
            onSubmit={(e) => this.props.onSubmit(e) } />
    }
  }



  render() {
    const {questionNumber, classes} = this.props
    const {question} = this.state
    if(!question) return (<div>Retrieving question from server..</div>)

    return (
      <div className={`question-${questionNumber}`}>
        <QuestionDisplay questionNumber={questionNumber} question={question} />
        {this.renderUserAnswerInput()}
      </div>
    );
  }
}

QuizQuestion.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  questionId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onSubmit: PropTypes.func.isRequired
}
export default withStyles(styles)(QuizQuestion);
