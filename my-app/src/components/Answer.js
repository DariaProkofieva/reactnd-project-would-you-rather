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
      dispatch(saveQuestionAnswer( answer))
  }
  render() {
    return (
      <div className='answer'>
      <div><span> asks:</span></div>
      <div><h3>Would you rather</h3></div>
      <form onSubmit={this.handleSubmitAnswer}>
        <input type="radio"
               id="optionOne"
               name="option"
               onChange={this.handleChange}/>
        <label for="optionOne">optionOne</label>
        <input type="radio"
               id="optionTwo"
               name="option"
               onChange={this.handleChange}/>
        <label for="optionOne">optionTwo</label>
        <button>Submit</button>
        </form>
      </div>
    )
  }
}


export default Answer
