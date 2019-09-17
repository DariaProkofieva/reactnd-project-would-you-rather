import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {
  state = {
    displayUnansweredQuestions:true
  }
  displayUnansweredQuestionsFunc = (e) => {
    e.preventDefault();
      this.setState({
          displayUnansweredQuestions: true
      })
  }
  displayAnsweredQuestionsFunc = (e) => {
    e.preventDefault()
      this.setState({
          displayUnansweredQuestions: false
      })
  }
  render() {
    const displayUnansweredQuestions = this.state.displayUnansweredQuestions;
      let display;
      if (displayUnansweredQuestions) {
        display = <ul>
           {this.props.userUnansweredQuestions.map((key) => (
             <li key={key}>
              <Question id={key}/>
            </li>
          ))}
        </ul>
      } else {
        display = <ul>
          {this.props.userAnsweredQuestions.map((key) => (
            <li key={key}>
              <Question id={key}/>
            </li>
          ))}
        </ul>
      }
    return (
      <div>
      <button onClick={this.displayUnansweredQuestionsFunc}>Unanswered Questions</button>
      <button onClick= {this.displayAnsweredQuestionsFunc}>Answered Questions</button>
      <div>{display}</div>
      </div>
      )
  }
}

function mapStateToProps ({ questions, authedUser, users }) {
  const userQuestions = users[authedUser].answers
  const userAnsweredQuestions = Object.keys(userQuestions)
  const userUnansweredQuestions = Object.keys(questions).filter(key => !userAnsweredQuestions.includes(key))
  if (userUnansweredQuestions === undefined) {
    return;
  }
  console.log(userAnsweredQuestions)
  console.log(userUnansweredQuestions)
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
