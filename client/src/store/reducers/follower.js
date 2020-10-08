import {
  GET_FOLLOWERS_REQUEST,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWERS_FAILURE,
  FILTER_FOLLOWERS,
} from "../actions/follower";

export default function followerReducer(
  state = { isFetching: false, data: [], query: "" },
  action
) {
  switch (action.type) {
    case GET_FOLLOWERS_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_FOLLOWERS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_FOLLOWERS_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    case FILTER_FOLLOWERS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
