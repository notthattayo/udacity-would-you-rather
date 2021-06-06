import { GET_USERS } from "../actions/users";
import { SUBMIT_ANSWER } from "../actions/answers";
export default function users(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users,
      };
    case SUBMIT_ANSWER:
      return {
        ...state,
        [action.authedUser]: {
          ...state[action.authedUser],
          answers: {
            ...state[action.authedUser].answers,
            [action.qId]: action.answer,
          },
        },
      };
    default:
      return state;
  }
}
