import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE
} from '../actions/posts';
import { POSTS_DEFAULT_OFFSET } from '../../constants/feed';

export default function signIn(state = {
  isFetching: false,
  data: [],
  offset: POSTS_DEFAULT_OFFSET
}, action) {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return { 
        ...state,
        ...action.payload
      }
    case GET_POSTS_SUCCESS:
      return { 
        ...state,
        ...action.payload,
        data: [...state.data, ...action.payload.data]
      }
    case GET_POSTS_FAILURE:
      return { 
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
