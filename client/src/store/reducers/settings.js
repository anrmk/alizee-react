import {
  UPDATE_PRIVACY_REQUEST,
  UPDATE_PRIVACY_SUCCESS,
  UPDATE_PRIVACY_FAILURE,

  UPDATE_ACTIVITY_STATUS_REQUEST,
  UPDATE_ACTIVITY_STATUS_SUCCESS,
  UPDATE_ACTIVITY_STATUS_FAILURE,

  UPDATE_PRIVATE_STATUS_REQUEST,
  UPDATE_PRIVATE_STATUS_SUCCESS,
  UPDATE_PRIVATE_STATUS_FAILURE,

  UPDATE_OFFENSIVE_COMMENTS_REQUEST,
  UPDATE_OFFENSIVE_COMMENTS_SUCCESS,
  UPDATE_OFFENSIVE_COMMENTS_FAILURE,

  GET_PRIVACY_REQUEST,
  GET_PRIVACY_SUCCESS,
  GET_PRIVACY_FAILURE,

  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
} from '../actions/settings';

export default function signIn(state = {
  isFetching: false,
  data: {},
}, action) {
  switch (action.type) {
    // Update privacy
    case UPDATE_PRIVACY_REQUEST:
      return { 
        ...state,
        ...action.payload
      }
    case UPDATE_PRIVACY_SUCCESS:
      return { 
        ...state,
        ...action.payload
      }
    case UPDATE_PRIVACY_FAILURE:
      return { 
        ...state,
        ...action.payload
      }
    // Update activity status
    case UPDATE_ACTIVITY_STATUS_REQUEST:
      return { 
        ...state,
        ...action.payload
      }
    case UPDATE_ACTIVITY_STATUS_SUCCESS:
      return { 
        ...state,
        ...action.payload
      }
    case UPDATE_ACTIVITY_STATUS_FAILURE:
      return { 
        ...state,
        ...action.payload
      }
    // Update private status
    case UPDATE_PRIVATE_STATUS_REQUEST:
      return { 
        ...state,
        ...action.payload
      }
    case UPDATE_PRIVATE_STATUS_SUCCESS:
      return { 
        ...state,
        ...action.payload
      }
    case UPDATE_PRIVATE_STATUS_FAILURE:
      return { 
        ...state,
        ...action.payload
      }
    // Update private status
    case UPDATE_OFFENSIVE_COMMENTS_REQUEST:
      return { 
        ...state,
        ...action.payload
      }
    case UPDATE_OFFENSIVE_COMMENTS_SUCCESS:
      return { 
        ...state,
        ...action.payload
      }
    case UPDATE_OFFENSIVE_COMMENTS_FAILURE:
      return { 
        ...state,
        ...action.payload
      }
    // Get privacy
    case GET_PRIVACY_REQUEST:
      return { 
        ...state,
        ...action.payload
      }
    case GET_PRIVACY_SUCCESS:
      return { 
        ...state,
        ...action.payload
      }
    case GET_PRIVACY_FAILURE:
      return { 
        ...state,
        ...action.payload
      }
    // Delete account
    case DELETE_ACCOUNT_REQUEST:
      return { 
        ...state,
        ...action.payload
      }
    case DELETE_ACCOUNT_SUCCESS:
      return { 
        ...state,
        ...action.payload
      }
    case DELETE_ACCOUNT_FAILURE:
      return { 
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
