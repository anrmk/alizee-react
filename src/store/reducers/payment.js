import {
  SEND_TIP_REQUEST,
  SEND_TIP_SUCCESS,
  SEND_TIP_FAILURE,
  BUY_POST_REQUEST,
  BUY_POST_SUCCESS,
  BUY_POST_FAILURE,
  SEND_DONATION_REQUEST,
  SEND_DONATION_SUCCESS,
  SEND_DONATION_FAILURE,
} from "../actions/payment";
import { IDLE } from "../../constants/request_status";

export default function paymentReducer(
  state = {
    isFetching: false,
    data: [],
    requestStatus: IDLE,
  },
  action
) {
  switch (action.type) {
    case SEND_TIP_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SEND_TIP_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SEND_TIP_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    // BUY
    case BUY_POST_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case BUY_POST_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case BUY_POST_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case SEND_DONATION_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SEND_DONATION_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SEND_DONATION_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
}
