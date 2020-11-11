import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
} from '../actions/signIn';
import {
  UPDATE_ACCOUNT_REQUEST,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAILURE,

  UPDATE_USERNAME_REQUEST,
  UPDATE_USERNAME_SUCCESS,
  UPDATE_USERNAME_FAILURE,
} from '../actions/settings';
import { USER_TOKEN } from '../../constants/user';

export default function signIn(state = {
  isFetching: false,
  isAuthenticated: !!localStorage.getItem(USER_TOKEN),
  isVerified: false,
  userInfo: {}
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
    // Settings
    case UPDATE_ACCOUNT_REQUEST:
      return { 
        ...state,
        ...action.payload
      }
    case UPDATE_ACCOUNT_SUCCESS:
      return { 
        ...state,
        ...action.payload
      }
    case UPDATE_ACCOUNT_FAILURE:
      return { 
        ...state,
        ...action.payload
      }
    case UPDATE_USERNAME_REQUEST:
      return { 
        ...state,
        ...action.payload
      }
    case UPDATE_USERNAME_SUCCESS:
      return { 
        ...state,
        ...action.payload
      }
    case UPDATE_USERNAME_FAILURE:
      return { 
        ...state,
        ...action.payload
      }
    default:
      return state;
  }
}
