import {
  GET_INTERESTS_REQUEST,
  GET_INTERESTS_SUCCESS,
  GET_INTERESTS_FAILURE,

  CREATE_INTERESTS_REQUEST,
  CREATE_INTERESTS_SUCCESS,
  CREATE_INTERESTS_FAILURE
} from '../actions/interests';

export default function interests(state = {
  isFetching: false,
  data: [],
}, action) {
  switch (action.type) {
    // Get Interests
    case GET_INTERESTS_REQUEST:
      return {
        ...state,
        ...action.payload
      }
    case GET_INTERESTS_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case GET_INTERESTS_FAILURE:
      return {
        ...state,
        ...action.payload
      }
    // Create Interests
    case CREATE_INTERESTS_REQUEST:
      return {
        ...state,
        ...action.payload
      }
    case CREATE_INTERESTS_SUCCESS:
      return {
        ...state,
        ...action.payload
      }
    case CREATE_INTERESTS_FAILURE:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
