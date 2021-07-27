import {
  GET_STATISTICS_FAILURE,
  GET_STATISTICS_REQUEST,
  GET_STATISTICS_SUCCESS,
  RESET_STATISTICS,
} from "../actions/getStatistics";

export default function statistics(
  state = {
    isFetching: false,
    errorMessage: "",
    data: [],
  },
  action
) {
  switch (action.type) {
    case GET_STATISTICS_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_STATISTICS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_STATISTICS_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_STATISTICS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
