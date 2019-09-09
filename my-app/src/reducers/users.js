import { RECEIVE_USERS, ADD_USER_ANSWER } from '../actions/users'

export default function users (state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    case ADD_USER_ANSWER:
      return {
        ...users,
        [action.authedUser]: {
          ...users[action.authedUser],
          answers: {
            ...users[action.authedUser].answers,
            [action.qid]: action.answer
          }
        }
      }
    default:
      return state
  }
 }
