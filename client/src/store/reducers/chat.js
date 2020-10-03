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

  ADD_MESSAGE
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
      return {
        ...state,
        ...action.payload,
        data: [...state.data, { ...action.payload.data }]
      };
    case CREATE_ROOM_FAILURE:
      return {
        ...state,
        ...action.payload,
      };

    case ADD_MESSAGE:
      return {
        ...state,
        ...action.payload,
        //add message to room
        // data: _ => {
        //   const rooms = state.data;
        //   const room = rooms.filter(x => x.id === action.payload.data.roomId)[0];
        //   if(room === null)
        //     {
        //       //создать или получить отсутствующий ROOM
        //     }
        //   room.messages.push(payload.data)
        //   const newRooms = [...rooms, room];

        //   return newRooms;
        // }
      };
    default:
      return state;
  }
}
