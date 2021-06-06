import React from "react";
import { connect } from "react-redux";

class ErrorPage extends React.Component {
  render() {
    return (
      <div className="error-page">
        <img
          src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
          alt="error-page"
        />
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  return {
    users,
  };
};
export default connect(mapStateToProps)(ErrorPage);
