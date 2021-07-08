import {
  GET_ROOM_REQUEST,
  GET_ROOM_SUCCESS,
  GET_ROOM_FAILURE,
  GET_ROOMS_REQUEST,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_FAILURE,
  FILTER_ROOMS,
  CREATE_ROOM_REQUEST,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILURE,
  DELETE_ROOM_REQUEST,
  DELETE_ROOM_SUCCESS,
  DELETE_ROOM_FAILURE,
  DELETE_ROOM_HISTORY_REQUEST,
  DELETE_ROOM_HISTORY_SUCCESS,
  DELETE_ROOM_HISTORY_FAILURE,
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  SHARE_MESSAGE_REQUEST,
  SHARE_MESSAGE_SUCCESS,
  SHARE_MESSAGE_FAILURE,
  ADD_MESSAGE_TO_LOCAL,
  RESET_CURRENT_ROOM,
} from "../actions/chat";

export default function chatReducer(state = { isFetching: false, data: [], current: undefined, query: "" }, action) {
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
        ...action.payload,
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
    // Get rooms
    case GET_ROOMS_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_ROOMS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

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

    // Delete room
    case DELETE_ROOM_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case DELETE_ROOM_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case DELETE_ROOM_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    // Delete room history
    case DELETE_ROOM_HISTORY_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case DELETE_ROOM_HISTORY_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case DELETE_ROOM_HISTORY_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }

    // Share a message to different rooms
    case SHARE_MESSAGE_REQUEST: {
      return {
        ...state,
        ...action.payload
      };
    }
    case SHARE_MESSAGE_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }
    case SHARE_MESSAGE_FAILURE: {
      return {
        ...state,
        ...action.payload
      };
    }

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
        ...action.payload,
      };

    default:
      return state;
  }
}
