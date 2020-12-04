import {
  GET_ROOM_REQUEST,
  GET_ROOM_SUCCESS,
  GET_ROOM_FAILURE,

  GET_ROOMS_REQUEST,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_FAILURE,

  FILTER_ROOMS,

  INCREMENT_NEW_MESSAGE_COUNT,

  CREATE_ROOM_REQUEST,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILURE,

  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  ADD_MESSAGE_TO_LOCAL,

  RESET_CURRENT_ROOM
} from "../actions/chat";

export default function chatReducer(
  state = { isFetching: false, data: [], query: "" },
  action
) {
  switch (action.type) {
    // Get a room
    case GET_ROOM_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_ROOM_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }
    case GET_ROOM_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    // Reset current room
    case RESET_CURRENT_ROOM:
      return {
        ...state,
        ...action.payload,
      };

    case GET_ROOMS_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_ROOMS_SUCCESS:
      return {
        ...state,
        ...action.payload
      };
    // Get rooms
    case GET_ROOMS_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    case FILTER_ROOMS:
      return {
        ...state,
        ...action.payload,
      };
    // Create a room
    case CREATE_ROOM_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case CREATE_ROOM_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case CREATE_ROOM_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    // Create a message
    case CREATE_MESSAGE_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case CREATE_MESSAGE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case CREATE_MESSAGE_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    case ADD_MESSAGE_TO_LOCAL:
      return {
        ...state,
        ...action.payload
      };
    // Increment message count
    case INCREMENT_NEW_MESSAGE_COUNT: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
}
