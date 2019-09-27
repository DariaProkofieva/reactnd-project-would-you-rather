import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class SingIn extends Component {
  state = {
    selectedUser: null
  }

  handleChange = ( event ) => {
    this.setState({ selectedUser: event.target.value })
  }

  handleSubmitUser = ( event ) => {
      event.preventDefault()
      const { selectedUser } = this.state
      const { dispatch } = this.props
      dispatch(setAuthedUser(selectedUser))
  }

  render() {
    let authedUser = this.props
    if (authedUser === true) {
      return <Redirect to='/home'/>
    }
    return(
      <div className="singIn">
        <h1>Welcome to the Would you Rather App!</h1>
        <h2>Please sing in to continue</h2>
        <img
          src="https://sun9-30.userapi.com/c851232/v851232949/1c5381/uABhMbHAaCQ.jpg"
          alt="Avatar icon"
          className='avatarIcon'
        />
        <h1 style={{color: "#7CA3FE"}}>Sing in</h1>
        <form onSubmit={this.handleSubmitUser} className="singInForm">
          <select onChange={this.handleChange} className="selectBtn">
            <option>Select User</option>
            {Object.keys(this.props.users).map((user) => (
              <option className="option" key={this.props.users[user].id} value={this.props.users[user].id}>
                {this.props.users[user].name}
              </option>
            ))}
          </select>
          <button className="btn">Sing in</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({  users, authedUser }) {
  if (authedUser === undefined) {
    return;
  }
  return {
    users,
    authedUser
  }
}
export default connect(mapStateToProps)(SingIn)
