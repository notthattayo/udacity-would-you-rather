import React from "react";
import { connect } from "react-redux";
import { handleSubmitAnswer } from "../actions/answers";
import { setAuthedUser } from "../actions/authedUser";

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answered: false,
      disabled: true,
      currentAnswer: "",
    };
  }
  componentDidMount = () => {
    Object.keys(this.props.users[this.props.authedUser].answers).forEach(
      (answer) => {
        if (answer === this.props.id) {
          this.setState({ answered: true });
        }
      }
    );
    if (!this.props.validId) {
      this.props.history.push("/error-page");
    }
  };

  setValue = (e) => {
    console.log(e.target.value);
    this.setState({ disabled: false, currentAnswer: e.target.value });
  };

  submitResults = (e) => {
    e.preventDefault();
    if (this.state.disabled) {
      alert("please select a value");
    } else {
      let authedUser = this.props.authedUser;
      let id = this.props.id;
      let answer = this.state.currentAnswer;
      this.props.dispatch(handleSubmitAnswer({ authedUser, qId: id, answer }));
    }
  };

  render() {
    const { questions, users, id, authedUser } = this.props;
    const q1Percentage =
      (questions[id]?.optionOne.votes.length /
        (questions[id]?.optionOne.votes.length +
          questions[id]?.optionTwo.votes.length)) *
      100;

    const q2Percentage =
      (questions[id]?.optionTwo.votes.length /
        (questions[id]?.optionOne.votes.length +
          questions[id]?.optionTwo.votes.length)) *
      100;

    return (
      <div className="question_detail">
        {this.state.answered ? (
          <div>
            <h2>Poll Results</h2>
            <div>
              <img
                src={users[questions[id]?.author].avatarURL}
                alt={users[questions[id]?.author]}
              ></img>
              <div
                className={
                  q2Percentage < q1Percentage
                    ? "poll-results winner"
                    : "poll-results"
                }
              >
                <h3>{questions[id]["optionOne"].text}</h3>

                <p>{`${q1Percentage} %`}</p>

                <p>{`${questions[id].optionOne.votes.length} out of ${
                  questions[id]?.optionOne.votes.length +
                  questions[id]?.optionTwo.votes.length
                } total votes`}</p>
                {questions[id]?.optionOne.votes.includes(authedUser) && (
                  <h4>You selected this option</h4>
                )}
              </div>
              <div
                className={
                  q2Percentage > q1Percentage
                    ? "poll-results winner"
                    : "poll-results"
                }
              >
                <h3>{questions[id]["optionTwo"].text}</h3>
                <p>{`${q2Percentage} %`}</p>

                <p>{`${questions[id]?.optionTwo.votes.length} out of ${
                  questions[id]?.optionOne.votes.length +
                  questions[id]?.optionTwo.votes.length
                } total votes`}</p>
                {questions[id]?.optionTwo.votes.includes(authedUser) && (
                  <h4>You selected this option</h4>
                )}
              </div>
            </div>
          </div>
        ) : (
          <>
            <h3>Would you Rather</h3>
            <img
              src={users[questions[id]?.author]?.avatarURL}
              alt={users[questions[id]?.author]?.name}
            ></img>
            <div>
              <form>
                <input
                  type="radio"
                  id="optionOne"
                  name="options"
                  value="optionOne"
                  onChange={(e) => this.setValue(e)}
                />
                <label htmlFor="optionOne">
                  {questions[id]?.["optionOne"].text}
                </label>
                <br />
                <input
                  type="radio"
                  id="optionTwo"
                  name="options"
                  value="optionTwo"
                  onChange={this.setValue}
                />
                <label htmlFor="optionTwo">
                  {questions[id]?.["optionTwo"].text}
                </label>
                <br />
                <button
                  className={this.state.disabled ? "btn" : " btn active-btn"}
                  onClick={(e) => this.submitResults(e)}
                >
                  Submit
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ questions, authedUser, users }, props) => {
  const { id } = props.match.params;
  let validId = true;
  if (!questions[id]) {
    validId = false;
  }
  return {
    setAuthedUser,
    authedUser,
    users,
    questions,
    id,
    validId,
  };
};
export default connect(mapStateToProps)(Question);
