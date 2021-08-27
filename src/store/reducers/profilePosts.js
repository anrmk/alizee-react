import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  RESET_POSTS,
  GET_FAVORITE_POSTS_REQUEST,
  GET_FAVORITE_POSTS_SUCCESS,
  GET_FAVORITE_POSTS_FAILURE,
  GET_TAGGED_POSTS_REQUEST,
  GET_TAGGED_POSTS_SUCCESS,
  GET_TAGGED_POSTS_FAILURE,
  UPDATE_PROFILE_POSTS_SUCCESS,
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
    case GET_POSTS_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_POSTS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_POSTS_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case RESET_POSTS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_FAVORITE_POSTS_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_FAVORITE_POSTS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_FAVORITE_POSTS_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_TAGGED_POSTS_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_TAGGED_POSTS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_TAGGED_POSTS_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case UPDATE_PROFILE_POSTS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
}
