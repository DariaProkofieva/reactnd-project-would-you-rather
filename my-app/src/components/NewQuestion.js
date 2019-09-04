import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
  }

  handleChange = ( event ) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubnit = ( event ) => {
    event.preventDefault()
    const { optionOneText, optionTwoText } = this.state
    const { dispatch } = this.props
    dispatch(handleAddQuestion(optionOneText, optionTwoText))
    console.log('New Question: ', optionOneText, optionTwoText)
  }

  render() {
    return (
      <div>
      <h2>Create New Question</h2>
      <p>Complete the question</p>
      <h3>Would you rather</h3>
      <form onSubmit={this.handleSubnit}>
      <input type="text"
             placeholder="Enter option one text here"
             value={this.state.optionOneText}
             name="optionOneText"
             maxLength={100}
             onChange={this.handleChange}/>
      <h3>OR</h3>
      <input type="text"
             placeholder="Enter option two text here"
             value={this.state.optionTwoText}
             name="optionTwoText"
             maxLength={100}
             onChange={this.handleChange}/>
      <button>Submit</button>
      </form>
      </div>
    )
  }
}
export default connect()(NewQuestion)
