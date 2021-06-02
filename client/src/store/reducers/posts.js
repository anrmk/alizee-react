import {
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  RESET_CURRENT_POST,

  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  RESET_POSTS,
  REFRESH_POSTS,

  GET_FAVORITE_POSTS_REQUEST,
  GET_FAVORITE_POSTS_SUCCESS,
  GET_FAVORITE_POSTS_FAILURE,

  GET_FOLLOWING_POSTS_REQUEST,
  GET_FOLLOWING_POSTS_SUCCESS,
  GET_FOLLOWING_POSTS_FAILURE,

  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,

  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_CURRENT_POST_SUCCESS,
  LIKE_POST_FAILURE,

  FAVORITE_POST_REQUEST,
  FAVORITE_POST_SUCCESS,
  FAVORITE_CURRENT_POST_SUCCESS,
  FAVORITE_POST_FAILURE,

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
  DELETE_POST_FAILURE
} from "../actions/post";

import {
  GET_POST_SUGGESTIONS_REQUEST,
  GET_POST_SUGGESTIONS_SUCCESS,
  GET_POST_SUGGESTIONS_FAILURE
} from "../actions/suggestion";

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
    // All posts
    case GET_POSTS_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_POSTS_SUCCESS:{
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

    case REFRESH_POSTS: {
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

    // All Favorite posts
    case GET_FAVORITE_POSTS_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_FAVORITE_POSTS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_FAVORITE_POSTS_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    // All Following posts
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

    // Some Post
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
		}
	}

    //SUGGESTION POSTS
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

    // CREATE
    case CREATE_POST_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case CREATE_POST_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }

    case CREATE_POST_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    // LIKE/UNLIKE
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

    // FAVORITE/UNFAVORITE
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

    case FAVORITE_CURRENT_POST_SUCCESS: {
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

    // RECEIPT
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

    // PURCHASE
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

    // UPDATE POST COMMENTS
    case UPDATE_POST_COMMENTS_REQUEST: {
      return {
        ...state,
        ...action.payload
      };
    }

    case UPDATE_POST_COMMENTS_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }

    case UPDATE_POST_COMMENTS_FAILURE: {
      return {
        ...state,
        ...action.payload
      };
    }

    // DELETE POST
    case DELETE_POST_REQUEST: {
      return {
        ...state,
        ...action.payload
      };
    }

    case DELETE_POST_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }

    case DELETE_POST_FAILURE: {
      return {
        ...state,
        ...action.payload
      };
    }

    default:
      return state;
  }
}
