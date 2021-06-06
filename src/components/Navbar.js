import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";

class NavBar extends React.Component {
  render() {
    const handleLogout = () => {
      this.props.dispatch(setAuthedUser(null));
    };
    return (
      <nav className="navbar">
        {this.props.authedUser && (
          <>
            <div className="navbar_navigation">
              <Link to="/">Polls</Link>
              <Link to="/add">Add New Poll</Link>
              <Link to="/leaderboard">Leaderboard</Link>
            </div>
            <div className="navbar_userInfo">
              <p>{this.props.users[this.props.authedUser].name}</p>

              <button onClick={handleLogout}> Log out</button>
            </div>
          </>
        )}
      </nav>
    );
  }
}

const mapStateToProps = ({ setAuthedUser, authedUser, users }) => {
  return {
    setAuthedUser,
    authedUser,
    users,
  };
};
export default connect(mapStateToProps)(NavBar);
