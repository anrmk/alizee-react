import {
  GET_POST_SUGGESTIONS_REQUEST,
  GET_POST_SUGGESTIONS_SUCCESS,
  GET_POST_SUGGESTIONS_FAILURE,
  RESET_POSTS_SUGGESTIONS
} from "../actions/suggestion";

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
    case RESET_POSTS_SUGGESTIONS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case GET_POST_SUGGESTIONS_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_POST_SUGGESTIONS_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }
    case GET_POST_SUGGESTIONS_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
}
