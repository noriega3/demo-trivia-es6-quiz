import PropTypes from 'prop-types'
import React, { Component } from 'react';
import _ from 'lodash';

import ScoreDisplay from '../components/ScoreDisplay';
import RestartToolbar from '../components/RestartToolbar';

import {
  calculateScore
} from '../actions/api';

class QuizScore extends Component {
    constructor(props){
      super(props)
      this.state = {
        loading: false,
        loaded: false,
        prepared: false,
        score: 0,
        correct: [],
        incorrect: [],
        answerSet: []
      };

      this.onReceivedScore = this.onReceivedScore.bind(this);
    };

    componentDidMount(){
      //auto prepare score on mount
      this.prepareScore();
    };

    componentDidUpdate(prevProps, prevState, snapshot){
      const {userAnswersArr, questionIdsArr} = this.props;
      const {prepared, answerSet, loading} = this.state;

      //Don't perform any operation if loading
      if(loading) return;

      //if there is a prepared answerSet then we calculate score
      if(!_.isEqual(prevState.answerSet, answerSet) && _.size(answerSet) > 0 && prepared){
        this.setState({loading: true});
        calculateScore({body:{answerSet}}, this.onReceivedScore);
      } else if(!_.isEqual(prevProps.userAnswersArr, userAnswersArr) || !_.isEqual(prevProps.questionIdsArr, questionIdsArr)){
        //if not loading, and not prepared answer set already, then prepare the score to be graded
        this.prepareScore();
      }
    };

    //prepares the array (combines the arrays) to be ready to send
    prepareScore(){
      let {questionIdsArr, userAnswersArr} = this.props;
      if(_.isEmpty(userAnswersArr)) return;
      let answerSet = [];

      _.map(questionIdsArr, (questionId, index) => {
        answerSet.push([questionId, userAnswersArr[index]]);
      })

      this.setState({prepared: true, loading: false, answerSet});
    };

    //when we receive a score back from the 'api'
    onReceivedScore(response){
      this.setState({loaded: true, loading: false, score: response.score, correct: response.correct, incorrect: response.incorrect});
    };

    //main render
    render() {
      const {onRestart, questionIdsArr} = this.props;
      const {loading, score, correct, incorrect} = this.state;
      if(loading) return (<div>Calculating score..</div>);

        return (<React.Fragment>
            <ScoreDisplay
              score={score}
              correct={correct}
              incorrect={incorrect}
              numQuestions={_.size(questionIdsArr)}
            />
            <RestartToolbar onRestart={onRestart}/>
        </React.Fragment>);
    };
}

QuizScore.defaultProps = {
  questionIds: [],
  answers: [],
  onSubmit: () => {}
};

QuizScore.propTypes = {
  questionIdsArr: PropTypes.array.isRequired,
  userAnswersArr: PropTypes.array.isRequired,
  onRestart: PropTypes.func,
  fetchScore: PropTypes.func
};

export default QuizScore;
