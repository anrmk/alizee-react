import {
  GET_FOLLOWERS_REQUEST,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWERS_FAILURE,
  FILTER_FOLLOWERS,

  GET_FOLLOWINGS_REQUEST,
  GET_FOLLOWINGS_SUCCESS,
  GET_FOLLOWINGS_FAILURE,
  FILTER_FOLLOWINGS
} from "../actions/relationship";

export default function relationshipReducer(
  state = { isFetching: false, followers: [], followings: [], query: "" },
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

    case GET_FOLLOWINGS_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_FOLLOWINGS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_FOLLOWINGS_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    case FILTER_FOLLOWINGS:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
