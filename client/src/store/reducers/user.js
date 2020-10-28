import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from "../actions/user";

export default function user(
  state = { isFetching: false, data: {} },
  action
) {
  switch (action.type) {
    case GET_USER_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
      
    default:
      return state;
  }
}
