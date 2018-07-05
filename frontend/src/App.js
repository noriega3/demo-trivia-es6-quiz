import React, { Component } from 'react';
import _ from 'lodash'
import CssBaseline from '@material-ui/core/CssBaseline';
import './App.css';
import QuizContainer from './containers/QuizContainer'
import QuizQuestion from './containers/QuizQuestion'
import QuizScore from './containers/QuizScore'

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
  render() {
    return (<React.Fragment>
      <CssBaseline/>
      <QuizContainer />
    </React.Fragment>);
  }
}

export default App
