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
  SEND_TIP_REQUEST,
  SEND_TIP_SUCCESS,
  SEND_TIP_FAILURE,
} from "../actions/payment"

import {
  ADD_DEPOSIT_SUCCESS
} from "../actions/account"

import { USER_TOKEN } from '../../constants/user';

export default function signIn(state = {
  isFetching: false,
  isAuthenticated: !!localStorage.getItem(USER_TOKEN),
  isVerified: false,
  isSocial: false,
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
    case SEND_TIP_REQUEST: {
      return {
        ...state,
        ...action.payload
      }
    }
    case SEND_TIP_SUCCESS: {
      return {
        ...state,
        ...action.payload
      }
    }
    case SEND_TIP_FAILURE: {
      return {
        ...state,
        ...action.payload
      }
    }
    case ADD_DEPOSIT_SUCCESS: {
      return {
        ...state,
        ...action.payload
      }
    }

    default:
      return state;
  }
}
