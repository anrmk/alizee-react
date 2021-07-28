import {
  GET_ACTIVITY_PAYMENTS_REQUEST,
  GET_ACTIVITY_PAYMENTS_SUCCESS,
  GET_ACTIVITY_PAYMENTS_FAILURE,
} from "../actions/activity";

export default function chatReducer(
  state = { isFetching: false, payment: [] },
  action
) {
  switch (action.type) {
    // Get the payment activity
    case GET_ACTIVITY_PAYMENTS_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_ACTIVITY_PAYMENTS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_ACTIVITY_PAYMENTS_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
