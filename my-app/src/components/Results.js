import React, { Component } from 'react'
import { connect } from 'react-redux'

class Results extends Component {

  render() {
    const { optionOne, optionTwo, question, name, avatar } =this.props
    const allVotes = question.optionOne.votes.length + question.optionTwo.votes.length
    const optionOneVotes = question.optionOne.votes.length
    const optionTwoVotes = question.optionTwo.votes.length
    const oneUser = Math.round(100/allVotes);
    const percentageOptionOne = oneUser*optionOneVotes
    const percentageOptionTwo = oneUser*optionTwoVotes
    return (
      <div className='results'>
        <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className='avatarSmall'
        />
        <div><span>Asked by {name}</span></div>
        <div><h2>Results:</h2></div>
        <h3>Would you rather {optionOne}?</h3>
        <p>{percentageOptionOne} %</p>
        <p>{optionOneVotes} out of {allVotes} votes</p>
        <h3>Would you rather {optionTwo}?</h3>
        <p>{percentageOptionTwo} %</p>
        <p>{optionTwoVotes} out of {allVotes} votes</p>
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
  const avatar =users[authedUser].avatarURL
  return {
    optionOne,
    optionTwo,
    question,
    avatar,
    name: author ===undefined ?  null: users[author].name
  }
}
export default connect(mapStateToProps)(Results)
