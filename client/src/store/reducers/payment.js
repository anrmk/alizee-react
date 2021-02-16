import { SEND_TIP_REQUEST, 
  SEND_TIP_SUCCESS, 
  SEND_TIP_FAILURE,
  
  BUY_POST_REQUEST,
  BUY_POST_SUCCESS,
  BUY_POST_FAILURE
} from "../actions/payment";

export default function chatMediaReducer(
  state = {
    isFetching: false,
    data: [],
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
    default:
      return state;
  }
}
