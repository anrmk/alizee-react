import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGN_IN_RESET
} from '../actions/signIn';
import {
  UPDATE_ACCOUNT_REQUEST,
  UPDATE_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_FAILURE,

  UPDATE_USERNAME_REQUEST,
  UPDATE_USERNAME_SUCCESS,
  UPDATE_USERNAME_FAILURE,
} from '../actions/settings';

import { 
  CREATE_MOOD_REQUEST, 
  CREATE_MOOD_SUCCESS, 
  CREATE_MOOD_FAILURE 
} from "../actions/mood";

import {
  GET_USER_DEPOSIT_REQUEST,
  GET_USER_DEPOSIT_SUCCESS,
  GET_USER_DEPOSIT_FAILURE,
} from "../actions/account"

import { USER_TOKEN } from '../../constants/user';

export default function signIn(state = {
  isFetching: false,
  isAuthenticated: !!localStorage.getItem(USER_TOKEN),
  isVerified: false,
  isSocial: false,
  userInfo: { deposit: 0 }
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
    // Reset data
    case SIGN_IN_RESET:
      return { 
        ...state,
        ...action.payload
      }

    case CREATE_MOOD_REQUEST: {
      return {
        ...state,
        ...action.payload
      }
    }

    case CREATE_MOOD_SUCCESS: {
      return {
        ...state,
        ...action.payload
      }
    }

    case CREATE_MOOD_FAILURE: {
      return {
        ...state,
        ...action.payload
      }
    }

    //DEPOSIT
    case GET_USER_DEPOSIT_REQUEST :  {
      return {
        ...state,
        ...action.payload
      }
    }

    case GET_USER_DEPOSIT_SUCCESS :  {
      return {
        ...state,
        ...action.payload
      }
    }

    case GET_USER_DEPOSIT_FAILURE :  {
      return {
        ...state,
        ...action.payload
      }
    }

    default:
      return state;
  }
}
