import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: "unanswered",
    };
  }

  render() {
    const handleAnsweredTabClick = () => {
      this.setState({ currentTab: "answered" });
    };
    const handleUnansweredTabClick = () => {
      this.setState({ currentTab: "unanswered" });
    };

    const { users, unanswered, answered } = this.props;

    return (
      <div className="dashboard">
        <div className="dashboard_tabs">
          <p
            className={this.state.currentTab === "unanswered" ? "selected" : ""}
            onClick={handleUnansweredTabClick}
          >
            Unanswered Polls
          </p>
          <p
            className={this.state.currentTab === "answered" ? "selected" : ""}
            onClick={handleAnsweredTabClick}
          >
            Answered Polls
          </p>
        </div>
        <div className="dashboard_questions">
          {this.state.currentTab === "unanswered" ? (
            <div className="unanswered-questions">
              {unanswered.map((question) => {
                return (
                  <div className="question_row" key={question.id}>
                    <h2>Would you rather</h2>
                    <p>{question["optionOne"].text}</p>
                    <p>OR</p>
                    <p>{question["optionTwo"].text}</p>

                    <img
                      src={users[question.author].avatarURL}
                      alt={users[question.author].name}
                    ></img>
                    <p>Asked by: {users[question.author].name}</p>
                    <Link to={`/question/${question.id}`}>
                      <button>Answer Poll</button>
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="answered-questions">
              {answered.map((question) => {
                return (
                  <div className="question_row" key={question.id}>
                    <h2>Would you rather</h2>
                    <p>{question["optionOne"].text}</p>
                    <p>OR</p>
                    <p>{question["optionTwo"].text}</p>
                    <img
                      src={users[question.author].avatarURL}
                      alt={users[question.author].name}
                    ></img>
                    <p>Asked by: {users[question.author].name}</p>
                    <Link to={`/question/${question.id}`}>
                      <button>View Answers</button>
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ setAuthedUser, authedUser, users, questions }) => {
  console.log(
    users[authedUser].answers,
    "all answers",
    questions,
    " all questions"
  );
  let answered = [];
  let unanswered = [];

  Object.keys(users[authedUser].answers).forEach((answer) => {
    Object.keys(questions).forEach((question) => {
      if (question === answer) answered.push(questions[question]);
    });
  });

  console.log(answered, "all answered questions");

  let unansweredIds = Object.keys(questions).filter((question) => {
    return !answered.includes(questions[question]);
  });

  unansweredIds.forEach((id) => {
    unanswered.push(questions[id]);
  });

  answered = answered.sort((x, y) => x.timestamp - y.timestamp).reverse();
  unanswered = unanswered.sort((x, y) => x.timestamp - y.timestamp).reverse();
  return {
    setAuthedUser,
    authedUser,
    users,
    questions,
    answered,
    unanswered,
  };
};
export default connect(mapStateToProps)(Dashboard);
