import React from "react";
import { connect } from "react-redux";
import { handleSaveQuestion } from "../actions/questions";

class AddPoll extends React.Component {
  submit = (e) => {
    e.preventDefault();
    let optionOneText = document.getElementById("optionOne").value;
    let optionTwoText = document.getElementById("optionTwo").value;
    let author = this.props.authedUser;
    this.props.dispatch(
      handleSaveQuestion({ optionOneText, optionTwoText, author })
    );
    this.props.history.push("/");
  };

  render() {
    return (
      <form className="add-poll">
        <h2>Would you rather</h2>
        <input id="optionOne"></input>
        <p>OR</p>
        <input id="optionTwo"></input>
        <br />

        <button onClick={(e) => this.submit(e)}>Submit</button>
      </form>
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
export default connect(mapStateToProps)(AddPoll);
