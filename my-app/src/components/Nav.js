import React, { Component, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../actions/authedUser'

import styled from "styled-components"


const Square = styled.div`
  height: 20px;
  color: ${props => props.active ? "red" : "yellow"};
  user-select: none;

  background-color: ${props => props.theme.mainColor};
`

const Nav = ({ authedUser, userName, avatar }) => {
  const [active, setActive] = useState(false)



  const handleLogout = ( event ) => {
      event.preventDefault()
      const { dispatch, authedUser } = this.props
      dispatch(logout(authedUser))
  }

  return (
    <nav className='nav'>
    <Square active ={active} onClick ={() => setActive(!active)}>safsdfsdfdfsfs</Square>
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
          <NavLink to='/leaderBoard' >
            Leader Board
          </NavLink>
        </li>
        {authedUser !== null
          &&  <div className='navLogin'>
                <div>
                  <div>Hello, {userName} </div>
                  <img
                    src={avatar}
                    alt={`Avatar of ${userName}`}
                    className='avatarSmall'
                  />
                </div>
                <li>
                  <NavLink to='/login' onClick = {() => handleLogout()}>
                     Log out
                  </NavLink>
                </li>
              </div>}
      </ul>
    </nav>
  )}


function mapStateToProps({ authedUser, users }) {
  const userName = users[authedUser] ? users[authedUser].name : null
  const avatar =users[authedUser]?users[authedUser].avatarURL:null
  return {
    authedUser,
    userName,
    avatar
  }
}
export default connect(mapStateToProps)(Nav)
