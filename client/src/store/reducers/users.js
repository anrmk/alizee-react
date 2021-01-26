import {
  GET_FOLLOWERS_REQUEST,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWERS_FAILURE,

  GET_FOLLOWINGS_REQUEST,
  GET_FOLLOWINGS_SUCCESS,
  GET_FOLLOWINGS_FAILURE,
  FILTER_FOLLOWINGS,

  CREATE_FOLLOW_REQUEST,
  CREATE_FOLLOW_SUCCESS,
  CREATE_FOLLOW_FAILURE,

  DELETE_FOLLOW_REQUEST,
  DELETE_FOLLOW_SUCCESS,
  DELETE_FOLLOW_FAILURE,

  RESET_RELATIONSHIP
} from "../actions/relationship";

import {
  GET_PEOPLE_SUGGESTIONS_REQUEST,
  GET_PEOPLE_SUGGESTIONS_SUCCESS,
  GET_PEOPLE_SUGGESTIONS_FAILURE
} from "../actions/suggestion"

import { 
  GET_USER_FAVORITES_REQUEST,
  GET_USER_FAVORITES_SUCCESS,
  GET_USER_FAVORITES_FAILURE,

  CREATE_USER_FAVORITES_REQUEST,
  CREATE_USER_FAVORITES_SUCCESS,
  CREATE_USER_FAVORITES_FAILURE,
  
  DELETE_USER_FAVORITES_REQUEST,
  DELETE_USER_FAVORITES_SUCCESS,
  DELETE_USER_FAVORITES_FAILURE,
 } from "../actions/account";


export default function usersReducer(
  state = { 
    isFetching: false,
    data: [],
    query: "" 
  },
  action
) {
  switch (action.type) {
    // Followers
    case GET_FOLLOWERS_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_FOLLOWERS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_FOLLOWERS_FAILURE:
      return {
        ...state,
        ...action.payload,
      };

    // Followings
    case GET_FOLLOWINGS_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_FOLLOWINGS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_FOLLOWINGS_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    case FILTER_FOLLOWINGS:
      return {
        ...state,
        ...action.payload,
      };
    // Follow
    case CREATE_FOLLOW_REQUEST:
      return {
        ...state,
        ...action.payload
      };
    case CREATE_FOLLOW_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case CREATE_FOLLOW_FAILURE:
      return {
        ...state,
        ...action.payload
      };
    case RESET_RELATIONSHIP:
      return {
        ...state,
        ...action.payload
      };
    // Unfollow
    case DELETE_FOLLOW_REQUEST:
      return {
        ...state,
        ...action.payload
      };
    case DELETE_FOLLOW_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    case DELETE_FOLLOW_FAILURE:
      return {
        ...state,
        ...action.payload
      };

    //FAVORITES
    case GET_USER_FAVORITES_REQUEST: {
      return {
        ...state,
        ...action.payload
      }
    }

    case GET_USER_FAVORITES_SUCCESS: {
      return {
        ...state,
        ...action.payload
      }
    }

    case GET_USER_FAVORITES_FAILURE: {
      return {
        ...state,
        ...action.payload
      }
    }

    //FAVORITE
    case CREATE_USER_FAVORITES_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case CREATE_USER_FAVORITES_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    
    case CREATE_USER_FAVORITES_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case DELETE_USER_FAVORITES_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case DELETE_USER_FAVORITES_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case DELETE_USER_FAVORITES_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    //PEOPLE SUGGESTIONS
    case GET_PEOPLE_SUGGESTIONS_REQUEST:{
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_PEOPLE_SUGGESTIONS_SUCCESS:{
      return {
        ...state,
        ...action.payload
      };
    }
    case GET_PEOPLE_SUGGESTIONS_FAILURE:{
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
}
