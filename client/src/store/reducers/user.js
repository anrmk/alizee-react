import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,

  RESET_USER,
  RESET_PASSWORD_CONFIRM_REQUEST,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAILURE,

  GET_SETTINGS_RESET_PASSWORD_CONFIRM_REQUEST,
  GET_SETTINGS_RESET_PASSWORD_CONFIRM_SUCCESS,
  GET_SETTINGS_RESET_PASSWORD_CONFIRM_FAILURE,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,

  GET_USER_STATISTICS_REQUEST,
  GET_USER_STATISTICS_SUCCESS,
  GET_USER_STATISTICS_FAILURE,

  ADD_FOLLOWER_SUCCESS,
  REMOVE_FOLLOWER_SUCCESS,
  UPDATE_MOOD_SUCCESS,

  ADD_FAVORITE_SUCCESS,
  ADD_BLOCKED_SUCCESS,

  REMOVE_BLOCKED_SUCCESS,
  REMOVE_FAVORITE_SUCCESS,

  UPDATE_AVATAR_URL_REQUEST,
  UPDATE_AVATAR_URL_SUCCESS,
  UPDATE_AVATAR_URL_FAILURE
} from "../actions/user";

// import {

// } from "../actions/account"

export default function user(
  state = {
    isFetching: false,
    data: {},
    statistics: {},
  },
  action
) {
  switch (action.type) {
    // Get user
    case GET_USER_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_USER:
      return {
        ...state,
        ...action.payload,
      };
    // Reset password confirm
    case RESET_PASSWORD_CONFIRM_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_PASSWORD_CONFIRM_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_PASSWORD_CONFIRM_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    // Get reset password confirm from settings
    case GET_SETTINGS_RESET_PASSWORD_CONFIRM_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_SETTINGS_RESET_PASSWORD_CONFIRM_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_SETTINGS_RESET_PASSWORD_CONFIRM_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    // Reset password
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    // Get user statistics
    case GET_USER_STATISTICS_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_USER_STATISTICS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_USER_STATISTICS_FAILURE:
      return {
        ...state,
        ...action.payload,
      };

    //FOLLOW
    case ADD_FOLLOWER_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case REMOVE_FOLLOWER_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    //MOOD
    case UPDATE_MOOD_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    //FAVORITE
    case ADD_FAVORITE_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case REMOVE_FAVORITE_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case ADD_BLOCKED_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case REMOVE_BLOCKED_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case UPDATE_AVATAR_URL_REQUEST:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_AVATAR_URL_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case UPDATE_AVATAR_URL_FAILURE:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}
