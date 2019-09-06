import React, { Component } from 'react'
import { saveQuestionAnswer } from '../utils/api'
import { connect } from 'react-redux'

class Answer extends Component {
  state = {
    answer: '',
  }
  handleChange = ( event ) => {
    this.setState({ answer: event.target.value })
  }

  handleSubmitAnswer = ( event ) => {
      event.preventDefault()
      const { answer } = this.state
      const { dispatch, authedUser, questions, id} = this.props
      dispatch(saveQuestionAnswer({
        authedUser,
        qId: questions[id],
        answer,
      }))

  }

  render() {
    const { author, qId, authedUser, answer, user, id} =this.props
    return (
      <div className='answer'>
      <div><span>{} asks:</span></div>
      <div><h3>Would you rather</h3></div>
      <form onSubmit={this.handleSubmitAnswer}>
        <input type="radio"
               id="optionOne"
               name="option"
               value="optionOne"
               onChange={this.handleChange}/>
        <label htmlFor="optionOne">optionOne</label>
        <input type="radio"
               id="optionTwo"
               name="option"
               value="optionTwo"
               onChange={this.handleChange}/>
        <label htmlFor="optionOne">optionTwo</label>
        <button>Submit</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ questions, authedUser, users }, { id }) {
  const question = questions[id]
  return {
    authedUser,
    question
  }
}


export default connect(mapStateToProps)(Answer)
