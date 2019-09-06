import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import LoadingBar from 'react-redux-loading-bar'
import NewQuestion from './NewQuestion'
import Answer from './Answer'
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
          <Dashboard/>
          <Route path='/' exact component={Dashboard} />
          <Route path='/answer/:id' exact component={Answer} />
          <Route path='/newQuestion' exact component={NewQuestion} />
        </Fragment>
      </Router>
    )
  }
}

export default connect()(App)
