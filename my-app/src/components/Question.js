import React, { Component, useState } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { Link } from 'react-router-dom'
import styled from "styled-components"

const Question = ({ authedUser, question, name, id, optionOne, }) => {


//class Question extends Component {
 // render() {
    //const { question } = this.props
    //const { name, id, timestamp, optionOne, optionTwo, answer,id } = question
    return (
      <div>
        <div><span>{question.name} asks:</span></div>
        <div><h3>Would you rather</h3></div>
        <div>{question.optionOne.text}</div>
        <Link to={`/answer/${id}`}>View Profile</Link>
      </div>
    )
  }
//}

function mapStateToProps({authedUser, questions, users}, { id }) {
  const question = questions[id]
  return {
    authedUser,
    question: formatQuestion(question, users[question.author], authedUser)
  }
}

export default connect(mapStateToProps)(Question)
