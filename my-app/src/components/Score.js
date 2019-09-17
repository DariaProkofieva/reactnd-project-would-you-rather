import React, { Component } from 'react'
import { connect } from 'react-redux'


class Score extends Component {

  render() {
    const { users, authedUser, questions, user, id, answeredQuestions, unAnsweredQuestions  } = this.props
    return (
      <div>
        <h3>{user.name}</h3>
        <p>Answered Questions {answeredQuestions} </p>
        <p>Unanswered Questions {unAnsweredQuestions} </p>
      </div>
    )
  }
}

function mapStateToProps ({ questions, authedUser, users }, { id }) {
  const user = users[id]
  if (user === undefined) {
    return;
  }
  const answeredQuestions = Object.keys(user.answers).length
  const unAnsweredQuestions = Object.keys(questions).length - answeredQuestions
  return {
    authedUser,
    users,
    questions,
    user,
    id,
    answeredQuestions,
    unAnsweredQuestions
  }
}

export default connect(mapStateToProps)(Score)
