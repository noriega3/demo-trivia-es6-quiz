import React, { Component } from 'react';
import _ from 'lodash'
import QuizQuestion from './QuizQuestion'
import QuizScore from './QuizScore'

const categories = ['topic', 'const/let']
const questionBank = [
  {
    "question": "Something",
    "difficulty": 3,
    "category": 2,
    "answerOptions": {
      "type": "input",
      "strict": true,
      "trim": true
    },
    "answer": [3]
  },
  {
    "question": "another",
    "difficulty": 5,
    "category": 2,
    "answerOptions": {
      "type": "choice",
      "userChoiceMax": 2,
      "choices": ["answer1","answer2","answer3","answer4"], //reference answer ids
    },
    "answer": [2]
  },
  {
    "question": "triple",
    "difficulty": 3,
    "category": 2,
    "answerOptions": {
      "type": "boolean",
      "choices": ["true","false"], //reference answer ids
    },
    "answer": [1]
  }
]
const answerBank = [
  "true", "false", "something", "something2", "something3", "something4"
]
/**
 * Assumptions:
 * User has selected a topic of let/const
 * Constant of 3 questions
 * Questions received can be of any order but are shuffled upon loading
 *
 * Constraints:
 * Must answer each question before proceeding
 */
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      questions: questionBank,
      questionNumber: 1,
      questionIndex: 0,
      userAnswers: [],
      showScore: false
    }

    this.onNewQuiz = this.onNewQuiz.bind(this)
  }
  componentDidMount(){
    this.onNewQuiz()
  }

  onNewQuiz(){
    let questions = _.sampleSize(questionBank, 3)
    this.setState({
      questions: _.shuffle(questions),
      userAnswers: [],
      questionIndex: 0,
      questionNumber: 1,
      showScore: false
    })
  }

  handleAnsweredQuestion(answer){
    console.log('answered question', answer)
    let userAnswers = _.clone(this.state.userAnswers)
    let questionIndex = this.state.questionIndex+1
    let questionNumber = questionIndex+1
    let showScore = _.isEqual(questionIndex, _.size(this.state.questions))

    userAnswers.push(answer)

    this.setState({
      userAnswers,
      questionNumber,
      questionIndex,
      showScore
    })
  }
  renderQuestion(){
    const {showScore, questions, questionIndex, questionNumber} = this.state
    if(showScore) return null

    return <QuizQuestion
      {...questions[questionIndex]}
      questionNumber={questionNumber}
      onSubmit={(e) => this.handleAnsweredQuestion(e)}
    />
  }

  renderScore(){
    const {showScore} = this.state
    if(!showScore) return null

    return <QuizScore
      onRestart={this.onNewQuiz}
    />
  }

  render() {
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

export default App
