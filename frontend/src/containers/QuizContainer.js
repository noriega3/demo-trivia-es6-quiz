import PropTypes from 'prop-types'
import React, { Component } from 'react';
import _ from 'lodash';

import QuizDisplay from '../components/QuizDisplay';
import StartDisplay from '../components/StartDisplay';
import StepperDisplay from '../components/StepperDisplay';
import WaitDisplay from '../components/WaitDisplay';

import QuizQuestion from './QuizQuestion';
import QuizScore from './QuizScore';

import { getQuestionListIds } from '../actions/api';

/**
 * This is the main container for a quiz instance.
 * @see App
 */
class QuizContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      autoStart: false,
      started: false,
      loading: false,
      loaded: false,
      showScore: false,

      questionsArr: [],
      questionNumber: 1,
      questionIndex: 0,

      userAnswersArr: [],
    };

    this.onQuestionListReceived = this.onQuestionListReceived.bind(this);  //binds newQuiz to this instance of quizContainer
  }

  componentDidMount(){
    const {category, shuffle, size} = this.props;

    //set state to loading true while questions are pulled in
    this.setState({loading: true});

    //load questions immediately upon mount
    getQuestionListIds({options: {category, shuffle, size}}, this.onQuestionListReceived);
  }

  componentDidUpdate(prevProps, prevState, snapshot){
    const {category, shuffle, size} = this.props;
    const {started, autoStart, loaded, loading} = this.state;

    if(started || loading) return;

    //if autoStart was false (now true) and loaded is false
    if(!_.isEqual(prevState.autoStart, autoStart) && autoStart && !loading && !loaded){

      this.setState({loading: true});

      //autoStart was previously false (now true)
      getQuestionListIds({options: {category, shuffle, size}}, this.onQuestionListReceived);

    } else if(!_.isEqual(prevState.loaded, loaded)){

      //check if we have a autoStart state
      if(loaded && autoStart){

        //start quiz after api receives and sets questions (this could be moved to onQuestionListReceived)
        this.startQuiz();
      }
    }
  };

  /**
   * Handles when we receive a list of questionIds from the mock "api"
   * @see getQuestionListIds
   * @param questionsArr
   */
  onQuestionListReceived(questionsArr = []){
    console.log('questions arr is', questionsArr, this.state)

    const {started, loading} = this.state
    if(started || !loading) return //ensure a game is not already started and loading is true

    this.setState({loaded: true, loading: false, questionsArr});
  };

  /**
   * Resets the state for quiz answering
   */
  startQuiz(){
    const {started, questionsArr, loading, loaded} = this.state;
    if(started || loading || !loaded) return; //ensure a game is not already started and loading is false
    if(_.isEmpty(questionsArr)) {
      return;
    } //show error

    this.setState({
      //set bool flags for quiz
      started: true,
      autoStart: false,
      showScore: false,
      //reset user input for the quiz
      userAnswersArr: [],
      questionIndex: 0,
      questionNumber: 1,
    });
  };

  /**
   * Resets the state for quiz answering
   */
  restartQuiz(type = ''){
    const isNewQuiz = _.isEqual(type, 'new')
    if(isNewQuiz)
      this.setState({
        started: false,
        showScore: false,
        autoStart: true,
        loading: false,
        loaded: false,
        questionsArr: [],
        userAnswersArr: [],
        questionIndex: 0,
        questionNumber: 1,
      });
      //startQuiz will be called upon new questions loaded from api
    else
      //use same questions in same order
      this.setState({
        started: true,
        autoStart: false,
        showScore: false,
        userAnswersArr: [],
        questionIndex: 0,
        questionNumber: 1
    });
  };

  /***
   * Starts the quiz upon Start click
   * @see renderStart
   */
  handleStartQuiz(){
    const {autoStart, started, loading, loaded} = this.state;

    //quiz already started
    if(started || loading) return; //ensure game not started, not loading

    //check if questions are loaded
    if(loaded){
      console.log('questions already loaded, start quiz');
      this.startQuiz();
      return;
    } else if(!loaded && !autoStart){  //set state to have a quiz active autoStart if not set
      console.log('questions not loaded, and not in autoStart state')
      //set state before retrieving questions
      this.setState({autoStart: true})
    }
  };

  /**
   * Handles when a Question is answered through onSubmit, sets answer for question to end of userAnswersArr
   * @see QuizQuestion
   * @param answer
   */
  handleAnsweredQuestion(answer){
    const {started, loaded} = this.state;
    if(!started || !loaded) return; //ensure game not started, not loading

    let userAnswersArr = _.clone(this.state.userAnswersArr); //don't modify direct state
    let questionIndex = this.state.questionIndex+1;
    let questionNumber = this.state.questionNumber+1;
    let showScore = _.isEqual(questionIndex, _.size(this.state.questionsArr));

    //add answer to user answers array
    userAnswersArr.push(answer);

    this.setState({
      userAnswersArr,
      questionNumber,
      questionIndex,
      showScore
    });
  };

  /**
   * Renders a question if score is not shown and questionArr has an index that matches an id
   * @see QuizQuestion
   * @returns {*} QuizQuestion or null
   */
  renderQuestion(){
    const {started, showScore, questionsArr, questionIndex, questionNumber, loading} = this.state;
    if(!started || showScore || loading) return null;
    if(_.get(questionsArr, questionIndex, -1) < 0) return <div>Could not find question with id of {questionIndex}</div>; //TODO: use react router to redirect to 404 / error page

    return <QuizQuestion
      questionId={questionsArr[questionIndex]}
      questionNumber={questionNumber}
      onSubmit={(e) => this.handleAnsweredQuestion(e)}
    />
  };

  /***
   * Calls/Renders the score if showScore is true
   * @see QuizScore
   * @returns {*} <QuizScore /> or null
   */
  renderScore(){
    const {started, showScore, questionsArr, userAnswersArr, loading} = this.state;
    if(!started || !showScore || loading) return null;

    return <QuizScore
      questionIdsArr={questionsArr}
      userAnswersArr={userAnswersArr}
      onRestart={(e) => {this.restartQuiz(e)}}
    />
  };

  /***
   * Renders the 'Start Quiz' button for the beginning
   * @returns {*}
   */
  renderStart(){
    const {started, showScore, autoStart, loading} = this.state;
    if(started || showScore || loading) return null;
    return <StartDisplay onStart={(e) => this.handleStartQuiz(e)} disabled={autoStart} />
  };

  /***
   * Renders the 'Start Quiz' button for the beginning
   * @returns {*}
   */
  renderStepper(){
    const {questionsArr, userAnswersArr, questionIndex, started, loading} = this.state;
    if(_.isEmpty(questionsArr) || loading) return null;
    return <StepperDisplay steps={questionsArr} completed={userAnswersArr} activeStep={started ? questionIndex: -1} />
  };

  /***
   * Renders the 'grey animated loading' (using react-content-loader)
   * @returns {*}
   */
  renderWait(){
    const {loading} = this.state;
    const {category, shuffle, size} = this.props;
    if(!loading) return null;
    return <WaitDisplay onRetry={(e) => getQuestionListIds({options: {category, shuffle, size}}, this.onQuestionListReceived)} />
  };

  //main render function
  render() {
    return (
      <QuizDisplay>
        {this.renderStepper()}
        {this.renderWait() || this.renderStart() || this.renderScore() || this.renderQuestion()}
      </QuizDisplay>
    );
  };
}

QuizContainer.defaultProps = {
  category: 'const/let',
  shuffle: true,
  size: 3
};

QuizContainer.propTypes = {
  category: PropTypes.string,
  shuffle: PropTypes.bool,
  size: PropTypes.number
};

export default QuizContainer
