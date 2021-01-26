import {
  GET_HOT_STREAMERS_REQUEST,
  GET_HOT_STREAMERS_SUCCESS,
  GET_HOT_STREAMERS_FAILURE,
} from '../actions/stream';

export default function stream(state = {
  isFetching: false,
  data: [],
  hotStreamers: []
}, action) {
  switch (action.type) {
    case GET_HOT_STREAMERS_REQUEST:
      return { 
        ...state,
        ...action.payload
      }
    case GET_HOT_STREAMERS_SUCCESS:
      return { 
        ...state,
        ...action.payload
      }
    case GET_HOT_STREAMERS_FAILURE:
      return { 
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}
