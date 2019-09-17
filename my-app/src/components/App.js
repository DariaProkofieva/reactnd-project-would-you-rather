import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading-bar'
import NewQuestion from './NewQuestion'
import Answer from './Answer'
import SingIn from './SingIn'
import Results from './Results'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Nav from './Nav'
import ScoreList from './ScoreList'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
            <div>
              <Nav />
              {this.props.authedUser === null
                ?  <SingIn />
                : <div>
                    <Route path='/home' exact component={Dashboard} />
                    <Route path='/answer/:id' component={Answer} />
                    <Route path='/newQuestion' component={NewQuestion} />
                    <Route path='/login' component={SingIn}/>
                    <Route path='/results' component={Results}/>
                    <Route path='/leaderBoard' component={ScoreList}/>
                  </div>}
              </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  }
}
export default connect(mapStateToProps)(App)
