export const SET_AUTHED_USER = 'SET_AUTHED_USER'
export const LOG_OUT = 'LOG_OUT'

export function setAuthedUser (id) {
  return{
    type: SET_AUTHED_USER,
    id,
  }
}

export function logout (authedUser) {
  return{
    type: LOG_OUT,
    authedUser
  }
}
