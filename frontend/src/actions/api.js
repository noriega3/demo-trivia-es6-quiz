/***
 * 'assumptions for backend logic'
 * @see QuizQuestion
 */

import _ from 'lodash';
const categories = ['some other topic', 'some other topic', "const/let"];
const questionBank = [
  {
    "_id": 10001, //internal id
    "question": "In the following code, what is the expected output?", //md formatted question text
    "code": { //react component will generate a code snippet block
      "language": 'javascript',
      "value": "const PICK_UP_TIME = 1300;\nlet TimeSincePickUp = -1;\n\nfunction setMailStatus(intHour) {\n  let TimeSincePickUp = intHour - PICK_UP_TIME;\n  return TimeSincePickUp;\n}\n\nsetMailStatus(1400);\n\nreturn TimeSincePickUp;\n"
    },
    "difficulty": 3, //difficulty (could filter if needed by difficulty) - not implemented just display
    "category": 2, //references categories
    "answerOptions": { //a set of options on what userInput will do
      "type": "input", //user input
      "trim": true, //trim the input before verification (also done client side)
    },
    "answer": ["-1", -1] //list of answers it could be (based on type === input)
  },
  {
    "_id": 10002,
    "question": "Which of the following **is** true about const/let?",
    "difficulty": 3,
    "category": 2,
    "answerOptions": {
      "type": "choice", //choice will have a choices : [], and answer will reference choices array
      "userChoiceMin": 3, //default 1, number of choices that are considered correct (used to be strict on front end to enable submit button only on X)

      //TODO: this will reference the ids inside answerBank
      "choices": [
        "let is used to declare variables that are limited in scope to the block",
        "JavaScript requires that const variables always be initialized",
        "It is recommended to use const variables for loops (ie. `for` loop)",
        "const and let were first introduced in ES6(2015)"]
      ,
    },
    "answer": [0,1,3] //reference choices array
  },
  {
    "_id": 10003,
    "question": "The **const** identifier is used to show the value can be reassigned.",
    "code": {
      "language": 'javascript',
      "value": "const PICK_UP_TIME = 1300;\n...\nPICK_UP_TIME = 30;"
    },
    "difficulty": 1,
    "category": 2,
    "answerOptions": {
      "type": "boolean", //boolean is the same as choice, but defaults to 1 userChoiceMin
      //TODO: this will reference the id inside answerBank
      "choices": ["true","false"], //could technically take this out and put on client side, but this is for uniformity sake.
    },
    "answer": [1]  //reference choices array
  }
];
//TODO: assign answers to this array "table" so it can be used for language or share same answer values / multiple choice bank
/*const answerBank = [
  "true", "false", "something", "something2", "something3", "something4"
]*/

/**
 * Calculates the score of the user (using an "api" call, so that a user can't modify their own score client-side)
 * @see QuizContainer
 * @param req has options (none so far), takes in an answerSet of [questionId, user's answer]
 * @param done
 */
export const calculateScore = (req, done) => {
  //const options = _.get(req, 'body.options', {}); //TODO: not implemented.
  const answerSet = _.get(req, 'body.answerSet');
  const qSize = _.size(answerSet);
  let correct       = [];
  let incorrect     = [];

  const isCorrect = (questionId, uAnswer) =>{
    //get the question and it's applicable data we need to check for correctness.
    const question    = _.find(questionBank, ["_id", questionId]);
    let answerOptions = _.get(question, `answerOptions`, {});
    let answerType    = _.get(answerOptions, `type`);
    let rightAnswer   = _.get(question, `answer`);
    let userAnswer    = uAnswer;

    console.log('qid: ', questionId, '| answer type: ', answerType, ' | right answer: ', rightAnswer, '| user answer: ', userAnswer)

    //based on type, figure out the answerOptions and see if the userAnswer is correct
    switch(answerType){
      case 'boolean':
      case 'choice':
        if(_.isArray(userAnswer)){
          //convert userAnswer that has an array of id (strings) to numbers
          userAnswer = _.map(userAnswer, _.toNumber);
        } else if(_.isString(userAnswer)){
          //convert single choice/bool to id
          userAnswer = [_.toNumber(userAnswer)];
        }
        return _.isEqual(userAnswer, rightAnswer);
      case 'input':
        //Already assuming array of possible matches
        userAnswer = _.unescape(uAnswer);
        return _.indexOf(rightAnswer, userAnswer) >= 0;
      default:
         return false
    }
  }

  //loop through each answer the user has inputted, and check against the answerOptions first set by the question bank
  _.map(answerSet, ([qIndex, uAnswer], i) => {
    if(isCorrect(qIndex, uAnswer))
      correct.push(qIndex);
    else
      incorrect.push(qIndex);
  })

  //TODO: add a list of questions/answers that are incorrect so we know which ones to display on react side.

  //simulate async by just adding a delay to this call
  _.delay(done, 100, {score: _.divide(_.size(correct), qSize), correct, incorrect});
}

/***
 * Retrieve a list of question ids for a quiz instance
 * @see QuizContainer
 * @param req  within options can set shuffle, size and category id
 * @param done
 */
export const getQuestionListIds = (req, done) => {
  const options       = _.get(req, 'options', {});
  const categoryId    = _.get(req, 'options.category') ? _.indexOf(categories, _.get(req, 'options.category')) : false;
  const toShuffle     = _.isEqual(_.get(req, 'options.shuffle', true), true);
  const maxQuestions  = _.get(options, 'size', 3); //default 3
  let questionList = [];

  //Retrieve questions based on category id passed in
  if(categoryId >=0){
    questionList = _.filter(questionBank, _.iteratee({ 'category': categoryId }));
  }
  //TODO: probably can be optimized using a mix of filter/reduce
  //get these question id's
  questionList = _.map(questionList, '_id');

  //get the max questions based on options.size passed in
  questionList = _.sampleSize(questionList, maxQuestions);

  //check if we need to shuffle these questions pulled in
  if(toShuffle){
    questionList = _.shuffle(questionList);
  }

  //simulate async by just adding a delay to this call
  _.delay(done, 1000, questionList);
}

/***
 * Retrieve a question's data by it's internal id
 * @see QuizQuestion
 * @param req
 * @param done
 * @returns {boolean}
 */
export const getQuestionById = (req, done) => {
  //retrieve the body which contains the questionId
  const questionId = _.get(req, 'body');
  if(!questionId) return false;

  //get the question id matching the question bank
  const question = _.find(questionBank, ["_id", questionId]);
  if(!question) return false;

  //simulate async by just adding a delay to this call
  _.delay(done, 100, _.pick(question, ['_id', 'question', 'difficulty', 'answerOptions', 'code']));
}
