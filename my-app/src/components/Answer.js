import React from 'react'
import { handleAddAnswer } from '../actions/shared'
import { connect } from 'react-redux'
//import { Redirect } from 'react-router-dom'
import Results from './Results'

class Answer extends React.Component {
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
    const { name, question, optionOne, optionTwo, authedUser, qid, avatar} =this.props
    return (
      <div className="answer">
        {toResults === false ?
          <div className="question_avatar">
            <div className="avatar_and_name">
              <h2>{name} asks:</h2>
                <img
                  src={this.props.avatar}
                  alt={`Avatar of ${this.props.name}`}
                  className='avatarBig'
                />
            </div>
            <div className="answerOptions">
              <h1>Would you rather...</h1>
              <form onSubmit={this.handleSubmitAnswer} className="form">
                <div className="radio">
                  <input type="radio"
                         id="optionOne"
                         name="option"
                         value="optionOne"
                         onChange={this.handleChange}/>
                  <label htmlFor="optionOne">{optionOne}</label>
                </div>
                <div className="radio">
                  <input type="radio"
                         id="optionTwo"
                         name="option"
                         value="optionTwo"
                         onChange={this.handleChange}/>
                  <label htmlFor="optionOne">{optionTwo}</label>
                </div>
                <button className="btn">Submit</button>
              </form>
            </div>
          </div>
        :<Results id={this.props.id}/>}</div>
    )
  }
}

const mapStateToProps = ({ questions, authedUser, users }, props) => {
  const { id } = props.match.params
  const question = questions[id]
  if (question === undefined) {
    return;
  }
  const author = question.author
  const optionOne = question.optionOne.text
  const optionTwo = question.optionTwo.text
  const qid = id
  const avatar =users[authedUser]?users[authedUser].avatarURL:null
  return {
    question,
    id,
    author,
    optionOne,
    optionTwo,
    qid,
    authedUser,
    name: author ===undefined ?  null: users[author].name,
    avatar
  }
}


export default connect()(Answer)
