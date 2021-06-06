import React from "react";
import { connect } from "react-redux";
import { handleSaveQuestion } from "../actions/questions";

class Leaderboard extends React.Component {
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
    const { formattedUsers } = this.props;

    return (
      <div>
        {formattedUsers.map((user) => {
          return (
            <div key={user.id} className="leaderboard">
              <h3>{user.name}</h3>
              <p>{`questions asked: ${user.questions}`}</p>
              <p>{`questions answered: ${user.answered}`}</p>
              <p>{`rating: ${user.rating}`}</p>
              <img src={user.image} alt={user.name} />
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => {
  console.log(users, "users");
  const formattedUsers = Object.values(users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      image: user.avatarURL,
      answered: Object.keys(user.answers).length,
      questions: user.questions.length,
      rating: Object.keys(user.answers).length + user.questions.length,
    }))
    .sort((x, y) => y.rating - x.rating);
  return {
    formattedUsers,
  };
};
export default connect(mapStateToProps)(Leaderboard);
