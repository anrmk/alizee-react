import {
  GET_HELP_FAILURE,
  GET_HELP_REQUEST,
  GET_HELP_SUCCESS,
  RESET_CURRENT_HELP,
  POST_HELP_RATING_FAILURE,
  POST_HELP_RATING_REQUEST,
  POST_HELP_RATING_SUCCESS,
  DELETE_HELP_RATING_FAILURE,
  DELETE_HELP_RATING_REQUEST,
  DELETE_HELP_RATING_SUCCESS,
  GET_HELP_DETAILS_FAILURE,
  GET_HELP_DETAILS_REQUEST,
  GET_HELP_DETAILS_SUCCESS,
  RESET_CURRENT_DETAILS_HELP,
} from "../actions/help";

export default function signIn(
  state = {
    isFetching: false,
    data: [],
    isVoted: false,
    errorMessage: "",
    helpDetails: {},
  },
  action
) {
  switch (action.type) {
    case GET_HELP_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_HELP_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_HELP_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_CURRENT_HELP:
      return {
        ...state,
        ...action.payload,
      };

    case POST_HELP_RATING_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case POST_HELP_RATING_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case POST_HELP_RATING_FAILURE:
      return {
        ...state,
        ...action.payload,
      };

    case DELETE_HELP_RATING_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case DELETE_HELP_RATING_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case DELETE_HELP_RATING_FAILURE:
      return {
        ...state,
        ...action.payload,
      };

    case GET_HELP_DETAILS_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_HELP_DETAILS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_HELP_DETAILS_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_CURRENT_DETAILS_HELP:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
