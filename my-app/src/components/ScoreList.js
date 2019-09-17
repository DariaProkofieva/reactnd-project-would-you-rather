import React, { Component } from 'react'
import { connect } from 'react-redux'
import Score from './Score'

class ScoreList extends Component {
  render() {
    const { usersIdsSorted } = this.props
    return (
      <ul>
         {usersIdsSorted.map((id) => (
           <li key={id}>
            <Score id={id}/>
           </li>
        ))}
      </ul>
    )
  }
}

function mapStateToProps ({ users }) {
  return {
    usersIdsSorted:Object.keys(users)
    .sort((userKeyA, userKeyB) =>
      Object.keys(users[userKeyB].answers).length
      + users[userKeyB].questions.length
      - Object.keys(users[userKeyA].answers).length
      - users[userKeyA].questions.length)
  }
}

export default connect(mapStateToProps)(ScoreList)
