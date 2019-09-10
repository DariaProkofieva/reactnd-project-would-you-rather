import { getInitialData, saveQuestionAnswer } from '../utils/api'
import { receiveQuestions, addAnswer } from '../actions/questions'
import { receiveUsers, addUserAnswer } from '../actions/users'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading-bar'

const AUTHED_ID = 'tylermcginnis'

export function handleInitialData (){
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({users, questions}) => {
        dispatch(receiveUsers(users))
        dispatch(receiveQuestions(questions))
        dispatch(setAuthedUser(AUTHED_ID))
        dispatch(hideLoading())
      })
  }
}

export function handleAddAnswer (authedUser, qid, answer) {
    return (dispatch) => {
      dispatch(addUserAnswer(authedUser, qid, answer))
      dispatch(addAnswer(authedUser, qid, answer))
        return saveQuestionAnswer({
          authedUser,
          qid,
          answer
        })
    }
}
