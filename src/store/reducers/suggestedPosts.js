import {
  GET_SUGGESTED_POSTS_REQUEST,
  GET_SUGGESTED_POSTS_SUCCESS,
  GET_SUGGESTED_POSTS_FAILURE,
  RESET_SUGGESTED_POSTS,
} from "../actions/post";

import { POSTS_DEFAULT_OFFSET } from "../../constants/feed";

export default function post(
  state = {
    isFetching: false,
    hasMore: false,
    data: [],
    offset: POSTS_DEFAULT_OFFSET,
  },
  action
) {
  switch (action.type) {
    case GET_SUGGESTED_POSTS_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case GET_SUGGESTED_POSTS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_SUGGESTED_POSTS_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case RESET_SUGGESTED_POSTS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
}
