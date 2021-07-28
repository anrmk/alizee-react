import {
  GET_CHANGE_LOG_REQUEST,
  GET_CHANGE_LOG_SUCCESS,
  GET_CHANGE_LOG_FAILURE,
  RESET_LOG_SUCCESS,
} from "../actions/changeLog";

export default function changeLogReducer(
  state = {
    isFetching: false,
    data: [],
    offset: 10,
  },
  action
) {
  switch (action.type) {
    case GET_CHANGE_LOG_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_CHANGE_LOG_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_CHANGE_LOG_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case RESET_LOG_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
}
