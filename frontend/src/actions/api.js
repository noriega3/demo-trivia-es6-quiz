import _ from 'lodash'
const categories = ['some other topic', 'some other topic', "const/let"]
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
    "answer": "let something = 'able'"
  },
  {
    "question": "another",
    "difficulty": 5,
    "category": 2,
    "answerOptions": {
      "type": "choice",
      "userChoiceMin": 2,
      "choices": ["answer1","answer2","answer3","answer4"], //reference answer ids
    },
    "answer": ["answer1","answer2"]
  },
  {
    "question": "triple",
    "difficulty": 3,
    "category": 2,
    "answerOptions": {
      "type": "boolean",
      "choices": ["true","false"], //reference answer ids
    },
    "answer": "true"
  }
]

const answerBank = [
  "true", "false", "something", "something2", "something3", "something4"
]

export const calculateScore = (req, done) => {
  const options = _.get(req, 'body.options', {})
  const answerSet = _.get(req, 'body.answerSet')
  const qSize = _.size(answerSet)
  let correct = 0
  let qAnswer, question
  _.map(answerSet, ([qIndex, answer], i) => {
    qAnswer = _.get(questionBank, `${qIndex}.answer`, '-99999')
    if(_.isEqual(answer, qAnswer))         //Note: assuming array of choices match those of answer set
      correct++;
  })
  done({score: _.divide(correct, qSize), correct})
}

export const getQuestionListIds = (req, done) => {
  const options       = _.get(req, 'options', {})
  const categoryId    = _.get(req, 'options.category') ? _.indexOf(categories, _.get(req, 'options.category')) : false
  const toShuffle     = _.isEqual(_.get(req, 'options.shuffle', true), true)
  const maxQuestions  = _.get(options, 'size', 3) //default 3
  let questionList = []

  if(categoryId >=0){
    questionList = _.filter(questionBank, _.iteratee({ 'category': categoryId }));
  }
  questionList = _.keys(questionList)
  questionList = _.sampleSize(questionList, maxQuestions)

  if(toShuffle){
    questionList = _.shuffle(questionList)
  }


  done(questionList)
}

export const getQuestionById = (req, done) => {
  const questionIndex = _.get(req, 'body')
  if(!questionIndex) return false
  const question = _.get(questionBank, questionIndex)
  if(!question) return false

  done(_.pick(question, ['question', 'difficulty', 'answerOptions']))
}
