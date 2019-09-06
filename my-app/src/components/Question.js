import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { Link } from 'react-router-dom'

class Question extends Component {
  render() {
    const { question } = this.props
    const { name, id, timestamp, optionOne, optionTwo, answer } = question
    return (
      <div className='question'>
        <div><span>{name} asks:</span></div>
        <div><h3>Would you rather</h3></div>
        <div>{optionOne.text}</div>
        <Link to ='/answer' id={this.props.id}>View Profile</Link>
      </div>
    )
  }
}

function mapStateToProps({authedUser, questions, users}, { id }) {
  const question = questions[id]
  return {
    authedUser,
    question: formatQuestion(question, users[question.author], authedUser)
  }
}

export default connect(mapStateToProps)(Question)
