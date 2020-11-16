import {
  AUTH_SOCIAL_REQUEST,
  AUTH_SOCIAL_SUCCESS,
  AUTH_SOCIAL_FAILURE
} from "../actions/socialAuth";

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
    default:
      return state
  }
}
