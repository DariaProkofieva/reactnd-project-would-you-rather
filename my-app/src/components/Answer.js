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
      const { dispatch } = this.props
      dispatch(saveQuestionAnswer({
        answer
      }))

  }

  render() {
    const { author, answer, question, optionOne, optionTwo} =this.props
    return (
      <div className='answer'>
      <div><span>{author} asks:</span></div>
      <div><h3>Would you rather</h3></div>
      <form onSubmit={this.handleSubmitAnswer}>
        <input type="radio"
               id="optionOne"
               name="option"
               value="optionOne"
               onChange={this.handleChange}/>
        <label htmlFor="optionOne">{optionOne}</label>
        <input type="radio"
               id="optionTwo"
               name="option"
               value="optionTwo"
               onChange={this.handleChange}/>
        <label htmlFor="optionOne">{optionTwo}</label>
        <button>Submit</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps({ questions, authedUser, users }, props) {
  const { id } = props.match.params
  const question = questions[id]
  if (question === undefined) {
    return;
  }
  const author = question.author
  const optionOne = question.optionOne.text
  const optionTwo = question.optionTwo.text
  return {
    question,
    id,
    author,
    optionOne,
    optionTwo
  }
}


export default connect(mapStateToProps)(Answer)
