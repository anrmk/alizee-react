import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_SOCIAL_REQUEST,
  SIGNUP_SOCIAL_SUCCESS,
  SIGNUP_SOCIAL_FAILURE
} from '../actions/signUp';

export default function signUp(state = {
  isFetching: false,
  isSignUp: false
}, action) {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return { 
        ...state,
        ...action.payload
      }
    case SIGNUP_SUCCESS:
      return { 
        ...state,
        ...action.payload
      }
    case SIGNUP_FAILURE:
      return { 
        ...state,
        ...action.payload
      }
    case SIGNUP_SOCIAL_REQUEST:
      return { 
        ...state,
        ...action.payload
      }
    case SIGNUP_SOCIAL_SUCCESS:
      return { 
        ...state,
        ...action.payload
      }
    case SIGNUP_SOCIAL_FAILURE:
      return { 
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
