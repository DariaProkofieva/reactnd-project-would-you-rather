import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h3 >Your Timeline</h3>
        <ul>
          {this.props.questionsIds.map((id) => (
            <li key={id}>
              <Question id={id}/>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps ({ questions }) {
  return {
    questionsIds: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard)
