import React from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import { setLoading } from "../actions/loading";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authedUser: null,
    };
  }

  handleUserSelect = (e) => {
    this.setState({ authedUser: e.target.value });
  };

  handleLogin = (e) => {
    e.preventDefault();
    this.props.dispatch(setLoading(true));
    this.props.dispatch(setAuthedUser(this.state.authedUser));
    setTimeout(() => {
      this.props.dispatch(setLoading(false));
    }, 1500);
  };

  render() {
    return (
      <div className="login-page">
        <div className="login-container">
          <h1>Would You Rather</h1>
          <div className="login-card">
            <form onSubmit={this.handleLogin}>
              <p>Select a User and Sign In</p>
              <select onChange={this.handleUserSelect}>
                <option>No user Selected</option>
                <option value="johndoe">John Doe</option>
                <option value="sarahedo">Sarah Edo</option>
                <option value="tylermcginnis"> Tyler Mcginnis</option>
              </select>
              <button>Sign In</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ setAuthedUser }) => {
  return {
    setAuthedUser,
  };
};
export default connect(mapStateToProps)(SignIn);
