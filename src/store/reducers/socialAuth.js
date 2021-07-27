import {
  AUTH_SOCIAL_REQUEST,
  AUTH_SOCIAL_SUCCESS,
  AUTH_SOCIAL_FAILURE
} from "../actions/socialAuth";
import {
  ONE_TIME_AUTH_REQUEST,
  ONE_TIME_AUTH_SUCCESS,
  ONE_TIME_AUTH_FAILURE
} from "../actions/oneTimeAuth";

export default function socialAuth(state = {
  isFetching: false,
  errorMessage: '',
  data: {}
}, action) {
  switch (action.type) {
    case AUTH_SOCIAL_REQUEST:
      return { 
        ...state,
        ...action.payload
      }
    case AUTH_SOCIAL_SUCCESS:
      return { 
        ...state,
        ...action.payload
      }
    case AUTH_SOCIAL_FAILURE:
      return { 
        ...state,
        ...action.payload
      }
    case ONE_TIME_AUTH_REQUEST:
      return { 
        ...state,
        ...action.payload
      }
    case ONE_TIME_AUTH_SUCCESS:
      return { 
        ...state,
        ...action.payload
      }
    case ONE_TIME_AUTH_FAILURE:
      return { 
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
