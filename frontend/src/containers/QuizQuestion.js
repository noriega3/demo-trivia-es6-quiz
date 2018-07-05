import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash'

import AnswerSingleChoice from '../components/answers/AnswerSingleChoice'
import AnswerMultiChoice from '../components/answers/AnswerMultiChoice'
import AnswerInput from '../components/answers/AnswerInput'

import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  answerContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  }
});

class QuizQuestion extends Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  /*  handleUserSubmit(ev){
    ev.preventDefault()
    console.log('handle answer submit', this.state.userAnswer)
    this.props.onSubmit(this.state.userAnswer)
  }*/

  renderUserAnswerInput(){
    const {answerOptions} = this.props
    let renderType  = _.get(answerOptions, 'type')
    const choiceMax = _.get(answerOptions, 'userChoiceMax', 1)

    switch(renderType){
      case 'input':
        return <AnswerInput {...answerOptions}
          onSubmit={(e) => this.props.onSubmit(e) }
        />
      case 'boolean':
      case 'multiple':
      case 'choice':
        if(choiceMax > 1)
          return <AnswerMultiChoice {...answerOptions}
            onSubmit={(e) => this.props.onSubmit(e) } />
        else
          return <AnswerSingleChoice {...answerOptions}
            onSubmit={(e) => this.props.onSubmit(e) } />
    }
  }



  render() {
    const {questionNumber, classes, question} = this.props
    console.log('props', this.props)
    return (
      <div className="question">
          <div>Question {questionNumber}. {question}</div>
          <FormControl
            className={classes.answerContainer}
            autoComplete={'off'}
            required
            onSubmit={(e)=>this.handleUserSubmit(e)}>
            {this.renderUserAnswerInput()}
          </FormControl>
      </div>
    );
  }
}

QuizQuestion.propTypes = {
  questionNumber: PropTypes.number.isRequired,
  question: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}
export default withStyles(styles)(QuizQuestion);
