import PropTypes from 'prop-types'
import React, { Component } from 'react';
import _ from 'lodash'

import QuizQuestion from './QuizQuestion'
import QuizScore from './QuizScore'

import {
  getQuestionListIds
} from '../actions/api'

/**
 * Assumptions:
 * User has selected a topic of let/const
 * Constant of 3 questions
 * Questions received can be of any order but are shuffled upon loading
 *
 * Constraints:
 * Must answer each question before proceeding
 */
class QuizContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      questionsArr: [],
      questionNumber: 1,
      questionIndex: 0,
      userAnswersArr: [],
      showScore: false
    }
    this.onNewQuiz = this.onNewQuiz.bind(this)
  }
  componentDidMount(){
    getQuestionListIds({options: {category: 'const/let', shuffle: true, size: 3}}, this.onNewQuiz)
  }

  onNewQuiz(questionsArr = []){
    //if(!questionsArr) return false //TODO: better validatio
    this.setState({
      questionsArr,
      userAnswersArr: [],
      questionIndex: 0,
      questionNumber: 1,
      showScore: false
    })
  }

  handleAnsweredQuestion(answer){
    let userAnswersArr = _.clone(this.state.userAnswersArr)
    let questionIndex = this.state.questionIndex+1
    let questionNumber = questionIndex+1
    let showScore = _.isEqual(questionIndex, _.size(this.state.questionsArr))

    userAnswersArr.push(answer)

    this.setState({
      userAnswersArr,
      questionNumber,
      questionIndex,
      showScore
    })
  }
  renderQuestion(){
    const {showScore, questionsArr, questionIndex, questionNumber} = this.state
    if(showScore) return null
    if(_.get(questionsArr, questionIndex, -1) < 0) return <div>Could not find question with id of {questionIndex}</div> //TODO: use react router to redirect to 404 / error page

    return <QuizQuestion
      questionId={questionsArr[questionIndex]}
      questionNumber={questionNumber}
      onSubmit={(e) => this.handleAnsweredQuestion(e)}
    />
  }

  renderScore(){
    const {showScore, questionsArr, userAnswersArr} = this.state
    if(!showScore) return null

    return <QuizScore
      questionIdsArr={questionsArr}
      userAnswersArr={userAnswersArr}
      onRestart={(e) => {getQuestionListIds({options: {category: 'const/let', shuffle: true, size: 3}}, this.onNewQuiz)}}
    />
  }

  render() {
    const {questionsArr} = this.state
    if(_.isEmpty(questionsArr)) return (<div>Retrieving questions..</div>)
    return (
      <div className="quiz">
        <div className="quiz-container">
          {this.renderScore()}
          {this.renderQuestion()}
        </div>
      </div>
    );
  }
}

QuizContainer.propTypes = {

}
export default QuizContainer
