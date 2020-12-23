import {
  GET_PEOPLE_SUGGESTIONS_REQUEST,
  GET_PEOPLE_SUGGESTIONS_SUCCESS,
  GET_PEOPLE_SUGGESTIONS_FAILURE,
  
  FOLLOW_PEOPLE_SUGGESTIONS_REQUEST,
  FOLLOW_PEOPLE_SUGGESTIONS_SUCCESS,
  FOLLOW_PEOPLE_SUGGESTIONS_FAILURE,

  UNFOLLOW_PEOPLE_SUGGESTIONS_REQUEST,
  UNFOLLOW_PEOPLE_SUGGESTIONS_SUCCESS,
  UNFOLLOW_PEOPLE_SUGGESTIONS_FAILURE,

  GET_POST_SUGGESTIONS_REQUEST,
  GET_POST_SUGGESTIONS_SUCCESS,
  GET_POST_SUGGESTIONS_FAILURE
} from "../actions/suggestion";

import { POSTS_DEFAULT_OFFSET } from "../../constants/feed";

export default function suggestionReducer(
  state = {
    people: {
      isFetching: false,
      hasMore: false,
      data: [],
      offset: POSTS_DEFAULT_OFFSET,
    },
    posts: {
      isFetching: false,
      hasMore: false,
      data: [],
      offset: POSTS_DEFAULT_OFFSET,
    },
  },
  action
) {
  switch (action.type) {
    case GET_PEOPLE_SUGGESTIONS_REQUEST:{
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_PEOPLE_SUGGESTIONS_SUCCESS:{
      return {
        ...state,
        ...action.payload,
     //   people: action.payload.people.reduce((acc, curr) => [...acc, { ...curr, isFollowing: false }], []),
      };
    }
    case GET_PEOPLE_SUGGESTIONS_FAILURE:{
      return {
        ...state,
        ...action.payload,
      };
    }

    //FOLLOW
    case FOLLOW_PEOPLE_SUGGESTIONS_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case FOLLOW_PEOPLE_SUGGESTIONS_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }

    case FOLLOW_PEOPLE_SUGGESTIONS_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    //UNFOLLOW
    case UNFOLLOW_PEOPLE_SUGGESTIONS_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case UNFOLLOW_PEOPLE_SUGGESTIONS_SUCCESS: {
      const { userId, isFollowing } = action.payload.data;
      const personIndex = state.people.findIndex((item) => item.id === userId);
      const people = [...state.people];
      people[personIndex].isFollowing = isFollowing;

      return {
        ...state,
        ...action.payload,
        people,
      };
    }

    case UNFOLLOW_PEOPLE_SUGGESTIONS_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    //POSTS
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
