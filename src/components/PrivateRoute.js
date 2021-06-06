import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import SignIn from "./SignIn";

const PrivateRoute = ({ component: Component, authedUser, ...rest }) => (
  <Route
    render={(props) =>
      authedUser ? <Component {...props} /> : <Redirect component={SignIn} />
    }
    {...rest}
  />
);

const mapStateToProps = ({ authedUser }) => {
  return {
    authedUser,
  };
};
export default connect(mapStateToProps)(PrivateRoute);
