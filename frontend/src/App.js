import React, { Component } from 'react';
import _ from 'lodash'
import CssBaseline from '@material-ui/core/CssBaseline';
import QuizContainer from './containers/QuizContainer'
import QuizQuestion from './containers/QuizQuestion'
import QuizScore from './containers/QuizScore'


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
    return (
      <React.Fragment>
        <CssBaseline/>
        <QuizContainer />
      </React.Fragment>);
  }
}

export default App
