import React, { Component } from 'react'
import { connect } from 'react-redux'


class Score extends Component {

  render() {
    const { user, answeredQuestions, createdQuestions, score } = this.props
    return (
      <div>
        <h3>{user.name}</h3>
        <p>Answered questions {answeredQuestions} </p>
        <p>Created questions {createdQuestions} </p>
        <h3>Score {score}</h3>
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
  const createdQuestions = Object.keys(user.questions).length
  const score = createdQuestions + answeredQuestions
  return {
    user,
    answeredQuestions,
    createdQuestions,
    score
  }
}

export default connect(mapStateToProps)(Score)
