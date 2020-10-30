import {
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,

  GET_FOLLOWING_POSTS_REQUEST,
  GET_FOLLOWING_POSTS_SUCCESS,
  GET_FOLLOWING_POSTS_FAILURE,

  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,

  RESET_POSTS,

  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
} from "../actions/post"; 
import { POSTS_DEFAULT_OFFSET } from "../../constants/feed";

export default function signIn(
  state = {
    isFetching: false,
    hasMore: false,
    data: [],
    currentPost: {},
    offset: POSTS_DEFAULT_OFFSET,
  },
  action
) {
  switch (action.type) {
    // All posts
    case GET_POSTS_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case GET_POSTS_FAILURE:
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
    case GET_POST_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_POST_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    // Create Post
    case CREATE_POST_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        data: [action.payload.data, ...state.data],
      };
    case CREATE_POST_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_POSTS:
      return {
        ...state,
        ...action.payload,
      };

    // Like/Unlike post
    case LIKE_POST_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case LIKE_POST_SUCCESS: {
      const posts = [...state.data];
      const postIndex = posts.findIndex(
        (post) => post.id === action.payload.data.postId
      );

      if (postIndex !== -1) {
        posts[postIndex].likes += action.payload.data.inactive ? -1 : 1;
        posts[postIndex].iLike = !action.payload.data.inactive;
      }

      const currentPost = state.currentPost;
      currentPost.likes += action.payload.data.inactive ? -1 : 1;
      currentPost.iLike = !action.payload.data.inactive;

      return {
        ...state,
        ...action.payload,
        data: posts,
        currentPost,
      };
    }
    case LIKE_POST_FAILURE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
