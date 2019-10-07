import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import LoadingBar from "react-redux-loading-bar";
import NewQuestion from "./NewQuestion";
import Answer from "./Answer";
import SingIn from "./SingIn";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Nav from "./Nav";
import ScoreList from "./ScoreList";
import Page404 from "./Page404";
import { Redirect } from "react-router-dom";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className="container">
            <Nav />
            {this.props.authedUser === null ? (
              <div>
                <SingIn />
                <Redirect to="/home" />
              </div>
            ) : (
              <div>
                <Route path="/home" component={Dashboard} />
                <Route path="/questions/:id" component={Answer} />
                <Route path="/add" component={NewQuestion} />
                <Route path="/login" component={SingIn} />
                <Route path="/leaderboard" component={ScoreList} />
                <Route path="/page404" component={Page404} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}
export default connect(mapStateToProps)(App);
