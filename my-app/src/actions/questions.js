import { saveQuestion, saveQuestionAnswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_ANSWER = 'ADD_ANSWER'

function addQuestion(question) {
  return{
    type: ADD_QUESTION,
    question,
  }
}

function addAnswer(authedUser, qId, answer) {
  return{
    type:ADD_ANSWER,
    authedUser,
    qId,
    answer
  }
}

export function handleAddAnswer(info) {
  return (dispatch) => {
    dispatch(addAnswer(info))

    return saveQuestionAnswer(info)
    .catch((event) => {
      console.warn('Error in addAnswer: ', event)
      dispatch(addAnswer(info))
      alert('There was an error, please try again')
    })
  }
}

export function handleAddQuestion(optionOneText, optionTwoText, ) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())
    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser,
    })
    .then((question) => dispatch(addQuestion(question)))
    .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}
