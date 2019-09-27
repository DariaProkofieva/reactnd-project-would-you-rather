import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  }

  handleChange = ( event ) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = ( event ) => {
    event.preventDefault()
    const { optionOneText, optionTwoText } = this.state
    const { dispatch } = this.props
    dispatch(handleAddQuestion(optionOneText, optionTwoText))
    this.setState(() => ({
      toHome: true
    }))
  }

  render() {
    const { toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/home'/>
    }
    return (
      <div className="newQuestion">
      <h1>Create New Question</h1>
      <p>Complete the question:</p>
      <h2>Would you rather...</h2>
      <form onSubmit={this.handleSubmit} className="newQuestion">
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
      <button className="btn">Submit</button>
      </form>
      </div>
    )
  }
}
export default connect()(NewQuestion)
