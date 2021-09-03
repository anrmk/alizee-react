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
  ADD_FAVORITE_SUCCESS,
  REMOVE_FAVORITE_SUCCESS,
  UPDATE_BLOCKED_SUCCESS,
  UPDATE_MOOD_SUCCESS,
  CHANGE_AVATAR_SUCCESS,
  CHANGE_COVER_SUCCESS,
} from "../actions/user";

import {
  GET_SUBSCRIBE_REQUEST,
  GET_SUBSCRIBE_SUCCESS,
  GET_SUBSCRIBE_FAILURE,
} from "../actions/relationship";

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

    case GET_SUBSCRIBE_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_SUBSCRIBE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_SUBSCRIBE_FAILURE:
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

    // FOLLOW
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

    // MOOD
    case UPDATE_MOOD_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    // FAVORITE
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

    case UPDATE_BLOCKED_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case CHANGE_AVATAR_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case CHANGE_COVER_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
}
