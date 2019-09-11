import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions/authedUser'

class Nav extends Component {
  handleLogout = ( event ) => {
      event.preventDefault()
      const { dispatch, authedUser } = this.props
      dispatch(logout(authedUser))
  }
  render() {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/home' exact >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/newQuestion' >
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink to='/home' >
            LeaderBoard
          </NavLink>
        </li>
        {this.props.authedUser !== null
          &&  <div>
                <div>
                    Hello, Authed User
                </div>
                <li>
                  <NavLink to='/login' onClick = {this.handleLogout}>
                    Log out
                  </NavLink>
                </li>
              </div>}
      </ul>
    </nav>
  )}
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}
export default connect(mapStateToProps)(Nav)
