import PropTypes from 'prop-types'
import React, { Component } from 'react';
import _ from 'lodash'
import Button from '@material-ui/core/Button';
import ScoreDisplay from '../components/ScoreDisplay'

import {
  calculateScore
} from '../actions/api'

class QuizScore extends Component {
    constructor(props){
      super(props)
      this.state = {
        score: 0,
        correct: -1,
        answerSet: []
      }

      this.onReceivedScore = this.onReceivedScore.bind(this)
    }

    componentDidMount(){
      this.prepareScore()
    }

    componentDidUpdate(prevProps, prevState){
      if(!_.isEqual(prevState.answerSet, this.state.answerSet)){
        calculateScore({body:{answerSet: this.state.answerSet}}, this.onReceivedScore)
      } else if(!_.isEqual(prevProps.userAnswersArr, this.props.userAnswersArr)){
        this.prepareScore()
      } else if(!_.isEqual(prevProps.questionIdsArr, this.props.questionIdsArr)){
        this.prepareScore()
      }
    }

    prepareScore(){
      let {questionIdsArr, userAnswersArr} = this.props
      let answerSet = []
      _.map(questionIdsArr, (questionId, index) => {
        answerSet.push([questionId, userAnswersArr[index]])
      })
      this.setState({answerSet})
    }

    onReceivedScore(response){
      this.setState({score: response.score, correct: response.correct})
    }
    render() {
      const {onRestart} = this.props
      if(_.size(this.props.questionIdsArr)<=0) return (<div>Calculating score..</div>)

        return (
            <div>
                <ScoreDisplay
                  score={this.state.score}
                  correct={this.state.correct}
                  numQuestions={_.size(this.props.questionIdsArr)}
                />
                <Button color="primary" onClick={onRestart}>Restart</Button>
            </div>
        );
    }
}
QuizScore.defaultProps = {
  questionIds: [],
  answers: [],
  onRestart: () => {}
}

QuizScore.propTypes = {
  questionIdsArr: PropTypes.array.isRequired,
  userAnswersArr: PropTypes.array.isRequired,
  onRestart: PropTypes.func,
  fetchScore: PropTypes.func
}

export default QuizScore;
