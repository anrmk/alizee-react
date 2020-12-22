import {
  GET_STORY_SLIDE_REQUEST,
  GET_STORY_SLIDE_SUCCESS,
  GET_STORY_SLIDE_FAILURE,

  GET_STORY_REQUEST,
  GET_STORY_SUCCESS,
  GET_STORY_FAILURE,
  RESET_STORY_SUCCESS,

  GET_FOLLOWING_STORIES_REQUEST,
  GET_FOLLOWING_STORIES_SUCCESS,
  GET_FOLLOWING_STORIES_FAILURE,
  RESET_FOLLOWING_STORIES_SUCCESS,

  CREATE_STORY_SLIDE_REQUEST,
  CREATE_STORY_SLIDE_SUCCESS,
  CREATE_STORY_SLIDE_FAILURE,
} from "../actions/story"; 
import { STORIES_DEFAULT_OFFSET } from "../../constants/feed";

export default function signIn(
  state = {
    isFetching: false,
    hasMore: false,
    data: [],
    currentStory: [],
    offset: STORIES_DEFAULT_OFFSET
  },
  action
) {
  switch (action.type) {
    case GET_STORY_SLIDE_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_STORY_SLIDE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_STORY_SLIDE_FAILURE:
      return {
        ...state,
        ...action.payload,
      };

    case GET_STORY_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_STORY_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case GET_STORY_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_STORY_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case GET_FOLLOWING_STORIES_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_FOLLOWING_STORIES_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_FOLLOWING_STORIES_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_FOLLOWING_STORIES_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case CREATE_STORY_SLIDE_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case CREATE_STORY_SLIDE_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case CREATE_STORY_SLIDE_FAILURE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
