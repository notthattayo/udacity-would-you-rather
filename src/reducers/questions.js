import { GET_QUESTIONS, SAVE_QUESTION } from "../actions/questions";
import { SUBMIT_ANSWER } from "../actions/answers";
export default function questions(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case SAVE_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    case SUBMIT_ANSWER:
      return {
        ...state,
        [action.qId]: {
          ...state[action.qId],
          [action.answer]: {
            ...state[action.qId][action.answer],
            votes: state[action.qId][action.answer].votes.concat([
              action.authedUser,
            ]),
          },
        },
      };
    default:
      return state;
  }
}
