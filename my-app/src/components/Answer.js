import React, { Component, useState }  from 'react'
import { handleAddAnswer } from '../actions/shared'
import { connect } from 'react-redux'
//import { Redirect } from 'react-router-dom'
import Results from './Results'

const Answer = ({ questions, authedUser, users, dispatch, qid, optionOne, optionTwo, avatar, name, id }) => {
  const [answer, setAnswer] = useState('')
  const [toResults, setToResults] = useState(false)
 
  const handleChange = ( event ) => {
    setAnswer(event.target.value)
  }

  const handleSubmitAnswer = ( event ) => {
      event.preventDefault()
      dispatch(handleAddAnswer(authedUser, qid, answer))
      setToResults(() => (true))
  }

    return (
      <div className="answer">
        {toResults === false ?
          <div className="question_avatar">
            <div className="avatar_and_name">
              <h2>{name} asks:</h2>
                <img
                  src={avatar}
                  alt={`Avatar of ${name}`}
                  className='avatarBig'
                />
            </div>
            <div className="answerOptions">
              <h1>Would you rather...</h1>
              <form onSubmit={handleSubmitAnswer} className="form">
                <div className="radio">
                  <input type="radio"
                         id="optionOne"
                         name="option"
                         value="optionOne"
                         onChange={handleChange}/>
                  <label htmlFor="optionOne">{optionOne}</label>
                </div>
                <div className="radio">
                  <input type="radio"
                         id="optionTwo"
                         name="option"
                         value="optionTwo"
                         onChange={handleChange}/>
                  <label htmlFor="optionOne">{optionTwo}</label>
                </div>
                <button className="btn">Submit</button>
              </form>
            </div>
          </div>
        :<Results id={id}/>}
        </div>
    )
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


export default connect(mapStateToProps)(Answer)
