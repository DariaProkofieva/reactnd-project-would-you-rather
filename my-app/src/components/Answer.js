import React, { Component } from 'react'
import { handleAddAnswer } from '../actions/shared'
import { connect } from 'react-redux'
//import { Redirect } from 'react-router-dom'
import Results from './Results'

class Answer extends Component {
  state = {
    answer: '',
    toResults:false
  }
  handleChange = ( event ) => {
    this.setState({ answer: event.target.value })
  }

  handleSubmitAnswer = ( event ) => {
      event.preventDefault()
      const { answer } = this.state
      const { dispatch, authedUser, qid} = this.props
      dispatch(handleAddAnswer(authedUser, qid, answer))
      this.setState(() => ({
        toResults: true
      }))
  }

  render() {
    const { toResults } = this.state
    const { author, question, optionOne, optionTwo, authedUser, qid} =this.props
    return (
      <div className='answer'>
        {toResults === false ?
          <div>
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
          :<Results id={this.props.id}/>}
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
  const qid = id
  return {
    question,
    id,
    author,
    optionOne,
    optionTwo,
    qid,
    authedUser
  }
}


export default connect(mapStateToProps)(Answer)
