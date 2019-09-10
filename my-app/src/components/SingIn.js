import React, { Component } from 'react'
import { connect } from 'react-redux'

class SingIn extends Component {
  state = {
    selectedUser: ''
  }

  handleChange = ( event ) => {
    this.setState({ selectedUser: event.target.value })
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

function mapStateToProps({  users }) {
  return {
    users
  }
}
export default connect(mapStateToProps)(SingIn)
