import React, { Component } from 'react';
import _ from 'lodash'
import logo from './logo.svg';
import './App.css';
import QuizQuestion from './containers/QuizQuestion'
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
      "choices": [3,4,5,6], //reference answer ids
    },
    "answer": [2]
  },
  {
    "question": "triple",
    "difficulty": 3,
    "category": 2,
    "answerOptions": {
      "type": "boolean",
      "choices": [1,2], //reference answer ids
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
 * Max is a static 3 questions
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
      onQuestion: 0
    }
  }
  componentDidMount(){
    this.onNewQuiz()
  }

  onNewQuiz(){
    let questions = _.sampleSize(questionBank, 3)
    this.setState({
      questions: _.shuffle(questions),
      onQuestion: 1,
    })
  }

  handleAnsweredQuestion(){

  }

  render() {
    const {questions, onQuestion} = this.state
    return (
      <div className="quiz">
        <header className="quiz-header">
        </header>
        <div className="quiz-container">
          <QuizQuestion
            data={questions[onQuestion]}
            onAnswered={(e) => this.handleAnsweredQuestion(e)} />
        </div>
      </div>
    );
  }
}

export default App;
