import { saveQuestionAnswer } from "../utils/api";
import { setLoading } from "./loading";

export const SUBMIT_ANSWER = "SUBMIT_ANSWER";

function submitAnswer({ authedUser, qId, answer }) {
  return {
    type: SUBMIT_ANSWER,
    authedUser,
    qId,
    answer,
  };
}

export function handleSubmitAnswer({ authedUser, qId, answer }) {
  return (dispatch) => {
    dispatch(setLoading(true));
    return saveQuestionAnswer({ authedUser, qid: qId, answer })
      .then(() => dispatch(submitAnswer({ authedUser, qId, answer })))
      .then(() => dispatch(setLoading(false)));
  };
}
