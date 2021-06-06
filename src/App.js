import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "./actions/shared";
import "./App.css";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import Loader from "react-loader-spinner";
import AddPoll from "./components/AddPoll";
import Question from "./components/Question";
import PrivateRoute from "./components/PrivateRoute";
import Leaderboard from "./components/Leaderboard";
import ErrorPage from "./components/ErrorPage";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <div className="App">
        {this.props.loading ? (
          <div className="loader">
            <Loader
              type="Bars"
              color="lightskyblue"
              height={100}
              width={100}
              timeout={3000}
            />
          </div>
        ) : this.props.authedUser === null ? (
          <Route path="/" component={SignIn} />
        ) : (
          <>
            <Navbar />
            <Switch>
              <Route path="/" exact component={Dashboard} />
              <Route path="/add" component={AddPoll}></Route>
              <Route path="/leaderboard" component={Leaderboard}></Route>
              <Route path="/error-page" component={ErrorPage}></Route>
              <PrivateRoute path="/question/:id" component={Question} />
            </Switch>
          </>
        )}
      </div>
    );
  }
}
function mapStateToProps({ authedUser, users, loading }) {
  return {
    authedUser,
    users,
    loading,
  };
}

export default connect(mapStateToProps)(App);
