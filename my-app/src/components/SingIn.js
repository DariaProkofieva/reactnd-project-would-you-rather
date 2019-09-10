import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

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
    return(
      <div>
        <h1>Welcome to the Would you Rather App!</h1>
        <h2>Please sing in to continue</h2>
        <h1>Sing in</h1>
        <form onSubmit={this.handleSubmitUser}>
          <select onChange={this.handleChange}>
            {Object.keys(this.props.users).map((user) => (
              <option key={this.props.users[user].id} value={this.props.users[user].id}>
                {this.props.users[user].name}
              </option>
            ))}
          </select>
          <button>Sing in</button>
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
