import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
} from '../actions/signIn';
import { USER_TOKEN } from '../../constants/user';

export default function signIn(state = {
  isFetching: false,
  isAuthenticated: !!localStorage.getItem(USER_TOKEN),
  isVerified: false
}, action) {
  switch (action.type) {
    case SIGNIN_REQUEST:
      return { 
        ...state,
        ...action.payload
      }
    case SIGNIN_SUCCESS:
      return { 
        ...state,
        ...action.payload
      }
    case SIGNIN_FAILURE:
      return { 
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
