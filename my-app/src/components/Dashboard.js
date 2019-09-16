import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3>Answered Questions</h3>
        <ul>
          {this.props.userAnsweredQuestions.map((key) => (
            <li key={key}>
              <Question id={key}/>
            </li>
          ))}
        </ul>
        <h3>Unanswered Questins</h3>
        <ul>
           {this.props.userUnansweredQuestions.map((key) => (
            <li key={key}>
              <Question id={key}/>
            </li>
          ))}

        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ questions, authedUser, users }) {
  const userQuestions = users[authedUser].answers
  const userAnsweredQuestions = Object.keys(userQuestions)
  const userUnansweredQuestions = Object.keys(questions).filter(key => userAnsweredQuestions.includes(key))
  if (userUnansweredQuestions === undefined) {
    return;
  }
  return {
    userUnansweredQuestions,
    userAnsweredQuestions,
    authedUser,
    users,
    questionsIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard)
