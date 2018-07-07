import React, { Component } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';

import QuizContainer from './containers/QuizContainer';
import AppBarDisplay from './components/AppBarDisplay';

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
    //rely on fragment to not generate another <div />
    return (
      <React.Fragment>
        <CssBaseline/>
        <AppBarDisplay />
        <QuizContainer />
      </React.Fragment>);
  };
}

export default App;
