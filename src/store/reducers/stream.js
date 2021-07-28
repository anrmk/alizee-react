import {
  CREATE_STREAM_ROOM_REQUEST,
  CREATE_STREAM_ROOM_SUCCESS,
  CREATE_STREAM_ROOM_FAILURE,
  UPDATE_STREAM_ROOM_REQUEST,
  UPDATE_STREAM_ROOM_SUCCESS,
  UPDATE_STREAM_ROOM_FAILURE,
  GET_HOT_STREAMERS_REQUEST,
  GET_HOT_STREAMERS_SUCCESS,
  GET_HOT_STREAMERS_FAILURE,
} from "../actions/stream";

export default function stream(
  state = {
    isFetching: false,
    data: {},
    hotStreamers: [],
  },
  action
) {
  switch (action.type) {
    case CREATE_STREAM_ROOM_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case CREATE_STREAM_ROOM_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case CREATE_STREAM_ROOM_FAILURE:
      return {
        ...state,
        ...action.payload,
      };

    case UPDATE_STREAM_ROOM_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_STREAM_ROOM_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_STREAM_ROOM_FAILURE:
      return {
        ...state,
        ...action.payload,
      };

    case GET_HOT_STREAMERS_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_HOT_STREAMERS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_HOT_STREAMERS_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
