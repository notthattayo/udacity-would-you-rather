import { SET_LOADING } from "../actions/loading";

export default function setLoading(state = false, action) {
  switch (action.type) {
    case SET_LOADING:
      return action.loading;
    default:
      return state;
  }
}
