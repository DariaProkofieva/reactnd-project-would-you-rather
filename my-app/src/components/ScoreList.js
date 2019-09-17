import React, { Component } from 'react'
import { connect } from 'react-redux'
import Score from './Score'


class ScoreList extends Component {
  render() {
    const { userId } = this.props
    return (
      <ul>
         {userId.map((id) => (
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
    userId:Object.keys(users)
  }
}

export default connect(mapStateToProps)(ScoreList)
