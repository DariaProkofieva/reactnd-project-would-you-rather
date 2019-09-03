import  authedUser from './authedUser'
import  users from './users'
import  questions from './questions'
import { combineReducers } from 'redux'

export default combineReducers({
  users,
  questions,
  authedUser,
})
