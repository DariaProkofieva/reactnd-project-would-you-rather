import React, { Component } from 'react'
import { connect } from 'react-redux'

class Results extends Component {
  render() {
    const { author, optionOne, optionTwo } =this.props
    return (
      <div className='results'>
        <div><span>Asked by{author}</span></div>
        <div><h2>Results:</h2></div>
        <h3>Would you rather {optionOne}?</h3>
        <p>{} out of {}} votes</p>
        <h3>Would you rather {optionTwo}?</h3>
        <p>{} out of {}} votes</p>
      </div>
    )
  }
}

function mapStateToProps({ questions, authedUser, users }, { id }) {
  const question = questions[id]
  if (question === undefined) {
    return;
  }
  const author = question.author
  const optionOne = question.optionOne.text
  const optionTwo = question.optionTwo.text
  return {
    author,
    optionOne,
    optionTwo,
  }
}
export default connect(mapStateToProps)(Results)
