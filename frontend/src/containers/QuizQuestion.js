import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';

import AnswerSingleChoice from '../components/answers/AnswerSingleChoice';
import AnswerMultiChoice from '../components/answers/AnswerMultiChoice';
import AnswerInput from '../components/answers/AnswerInput';
import QuestionDisplay from '../components/QuestionDisplay';

import { getQuestionById } from '../actions/api';

class QuizQuestion extends Component {
  constructor(props){
    super(props);
    this.state = {
      pending: true,
      question: undefined,
      difficulty: undefined,
      answerOptions: undefined,
      code: undefined
    };

    this.onReceivedQuestion = this.onReceivedQuestion.bind(this);
  };

  componentDidMount(){
    const {questionId} = this.props;
    getQuestionById({body: questionId}, this.onReceivedQuestion);
  };

   componentDidUpdate(prevProps, prevState, snapshot){
    const {questionId, questionNumber} = this.props;

    //if question id changes and there is a valid questionId then we want to get question
    if(!_.isEqual(prevProps.questionId, questionId) && questionId) {

      this.setState({
        pending: true,
        question: false,
        difficulty: false,
        answerOptions: false,
        code: false
      });

      if(!_.isEqual(prevProps.questionNumber, questionNumber))
        getQuestionById({body: questionId}, this.onReceivedQuestion);

    }
  };

   //on received question from 'api'
  onReceivedQuestion(response){
    //TODO: api validation verifying id received matches current state id
    const {question, difficulty, answerOptions, code} = response

    this.setState({
      pending: false,
      question: _.toString(question),
      difficulty: _.toNumber(difficulty),
      answerOptions,
      code
    });
  };

  //render the answer display based on type returned
  renderUserAnswerInput(){
    const {answerOptions} = this.state;
    let renderType  = _.get(answerOptions, 'type');
    const choiceMin = _.get(answerOptions, 'userChoiceMin', 1);

    switch(renderType){
      case 'input':
        return (<AnswerInput {...answerOptions} onSubmit={(e) => this.props.onSubmit(e) } />);
      case 'boolean':
      case 'choice':
        if(choiceMin > 1)
          return (<AnswerMultiChoice {...answerOptions} onSubmit={(e) => this.props.onSubmit(e) } />);
        else
          return (<AnswerSingleChoice {...answerOptions} onSubmit={(e) => this.props.onSubmit(e) } />);
      default:
        return (<div>Invalid answer type was received!</div>);
    }
  };

  //main render
  render() {
    const {questionNumber} = this.props;
    const {question, code, difficulty, pending} = this.state;
    if(!question || pending) return (<div>Retrieving question from server..</div>);

    return (
      <QuestionDisplay questionNumber={questionNumber} question={question} code={code} difficulty={difficulty}>
        {this.renderUserAnswerInput()}
      </QuestionDisplay>
    );
  };
}

QuizQuestion.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  questionId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default QuizQuestion;
