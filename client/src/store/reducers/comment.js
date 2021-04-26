import {
  GET_COMMENTS_POST_REQUEST,
  GET_COMMENTS_POST_SUCCESS,
  GET_COMMENTS_POST_FAILURE,
  RESET_COMMENTS_POST_SUCCESS,

  CREATE_COMMENT_POST_REQUEST,
  CREATE_COMMENT_POST_SUCCESS,
  CREATE_COMMENT_POST_FAILURE,

  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAILURE
} from "../actions/comment";
import { POSTS_DEFAULT_OFFSET } from "../../constants/feed";

export default function comment(
  state = {
    isFetching: false,
    hasMore: false,
    data: [],
    offset: POSTS_DEFAULT_OFFSET,
  },
  action
) {
  switch (action.type) {
    case GET_COMMENTS_POST_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_COMMENTS_POST_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_COMMENTS_POST_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_COMMENTS_POST_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case CREATE_COMMENT_POST_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case CREATE_COMMENT_POST_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case CREATE_COMMENT_POST_FAILURE:
      return {
        ...state,
        ...action.payload,
      };

    case DELETE_COMMENT_REQUEST:
      return {
        ...state,
        ...action.payload
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
}
