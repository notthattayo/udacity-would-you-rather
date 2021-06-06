import { saveQuestion } from "../utils/api";
import { setLoading } from "./loading";

export const GET_QUESTIONS = "GET_QUESTIONS";
export const SAVE_QUESTION = "SAVE_QUESTION";

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions,
  };
}

function saveQuestionToStore(question) {
  return {
    type: SAVE_QUESTION,
    question,
  };
}

export function handleSaveQuestion({ optionOneText, optionTwoText, author }) {
  return (dispatch) => {
    dispatch(setLoading(true));
    return saveQuestion({ optionOneText, optionTwoText, author })
      .then((question) => dispatch(saveQuestionToStore(question)))
      .then(() => dispatch(setLoading(false)));
  };
}
