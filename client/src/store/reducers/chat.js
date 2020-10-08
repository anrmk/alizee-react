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
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  CREATE_MESSAGE,
} from "../actions/chat";

export default function followerReducer(
  state = { isFetching: false, data: [], query: "" },
  action
) {
  switch (action.type) {
    case GET_ROOM_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_ROOM_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_ROOM_FAILURE:
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

    case CREATE_ROOM_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case CREATE_ROOM_SUCCESS:
      const existedRoom = state.data.filter(room => room.id === action.payload.data.id);
      return {
        ...state,
        ...action.payload,
        data: existedRoom.length ? [...state.data] : [...state.data,  {...action.payload.data }],
        currentRoom: { ...action.payload.data }
      };
    case CREATE_ROOM_FAILURE:
      return {
        ...state,
        ...action.payload,
      };

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
    case CREATE_MESSAGE:
      return {
        ...state,
        currentRoom: {
          ...state.currentRoom,
          ...{
            messages: [...state.currentRoom.messages, action.payload.data],
          },
        },
      };
    default:
      return state;
  }
}
