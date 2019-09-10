import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading-bar'
import NewQuestion from './NewQuestion'
import Answer from './Answer'
import SingIn from './SingIn'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <SingIn/>
          <Route path='/home' exact component={Dashboard} />
          <Route path='/answer/:id' component={Answer} />
          <Route path='/newQuestion' component={NewQuestion} />
          <Route path='/login' component={SingIn} />
        </Fragment>
      </Router>
    )
  }
}

export default connect()(App)
