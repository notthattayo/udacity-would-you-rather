import { getInitialData } from "../utils/api";
import { getUsers } from "../actions/users";
import { getQuestions } from "../actions/questions";
import { setLoading } from "../actions/loading";

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(setLoading(false));
      dispatch(getUsers(users));
      dispatch(getQuestions(questions));
    });
  };
}
