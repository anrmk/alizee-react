import {
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  RESET_CURRENT_POST,
  GET_FOLLOWING_POSTS_REQUEST,
  GET_FOLLOWING_POSTS_SUCCESS,
  GET_FOLLOWING_POSTS_FAILURE,
  RESET_FOLLOWING_POSTS,
  REFRESH_POST,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_CURRENT_POST_SUCCESS,
  FAVORITE_POST_REQUEST,
  FAVORITE_POST_SUCCESS,
  FAVORITE_POST_FAILURE,
  FAVORITE_CURRENT_POST_SUCCESS,
  RECEIPT_POST_REQUEST,
  RECEIPT_POST_SUCCESS,
  RECEIPT_POST_FAILURE,
  PURCHASE_POST_REQUEST,
  PURCHASE_POST_SUCCESS,
  PURCHASE_POST_FAILURE,
  UPDATE_POST_COMMENTS_REQUEST,
  UPDATE_POST_COMMENTS_SUCCESS,
  UPDATE_POST_COMMENTS_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  HIDE_POST_REQUEST,
  HIDE_POST_SUCCESS,
  HIDE_POST_FAILURE,
  ADD_POSTS_USER_FAVORITE_SUCCESS,
  ADD_POST_USER_FAVORITE_SUCCESS,
  DELETE_POSTS_USER_FAVORITE_SUCCESS,
  DELETE_POST_USER_FAVORITE_SUCCESS,
  UPDATE_POSTS_USER_BLOCK_SUCCESS,
  UPDATE_POST_USER_BLOCK_SUCCESS,
} from "../actions/post";

import { POSTS_DEFAULT_OFFSET } from "../../constants/feed";

export default function post(
  state = {
    isFetching: false,
    hasMore: false,
    data: [],
    currentPost: {},
    purchases: [],
    receipt: {},
    currentCommnets: [],
    offset: POSTS_DEFAULT_OFFSET,
  },
  action
) {
  switch (action.type) {
    case GET_FOLLOWING_POSTS_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_FOLLOWING_POSTS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_FOLLOWING_POSTS_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_FOLLOWING_POSTS:
      return {
        ...state,
        ...action.payload,
      };
    case REFRESH_POST:
      return {
        ...state,
        ...action.payload,
      };

    case GET_POST_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_POST_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_POST_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case RESET_CURRENT_POST: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case CREATE_POST_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case CREATE_POST_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case CREATE_POST_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case LIKE_POST_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case LIKE_POST_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case LIKE_CURRENT_POST_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case LIKE_POST_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case FAVORITE_POST_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case FAVORITE_POST_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case FAVORITE_POST_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case FAVORITE_CURRENT_POST_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case RECEIPT_POST_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case RECEIPT_POST_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case RECEIPT_POST_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case PURCHASE_POST_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case PURCHASE_POST_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case PURCHASE_POST_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case UPDATE_POST_COMMENTS_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case UPDATE_POST_COMMENTS_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case UPDATE_POST_COMMENTS_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case DELETE_POST_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case DELETE_POST_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case DELETE_POST_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case HIDE_POST_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case HIDE_POST_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case HIDE_POST_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case ADD_POSTS_USER_FAVORITE_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case ADD_POST_USER_FAVORITE_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case DELETE_POSTS_USER_FAVORITE_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case DELETE_POST_USER_FAVORITE_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case UPDATE_POSTS_USER_BLOCK_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case UPDATE_POST_USER_BLOCK_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
}
