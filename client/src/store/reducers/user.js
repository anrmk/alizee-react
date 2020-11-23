import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,

  RESET_PASSWORD_CONFIRM_REQUEST,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAILURE,

  GET_SETTINGS_RESET_PASSWORD_CONFIRM_REQUEST,
  GET_SETTINGS_RESET_PASSWORD_CONFIRM_SUCCESS,
  GET_SETTINGS_RESET_PASSWORD_CONFIRM_FAILURE,

  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE
} from "../actions/user";

export default function user(
  state = { isFetching: false, data: {} },
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
    default:
      return state;
  }
}
