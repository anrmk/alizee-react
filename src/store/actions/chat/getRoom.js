import { generateUrl } from "../../../helpers/functions";

export const GET_ROOM_REQUEST = "GET_ROOM_REQUEST";
export const GET_ROOM_SUCCESS = "GET_ROOM_SUCCESS";
export const GET_ROOM_FAILURE = "GET_ROOM_FAILURE";

function requestGetRoom() {
  return {
    type: GET_ROOM_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetRoom(data, current) {
  return {
    type: GET_ROOM_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data,
      current,
    },
  };
}

function errorGetRoom(message) {
  return {
    type: GET_ROOM_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getRoom(api, userName) {
  return async (dispatch, getState) => {
    dispatch(requestGetRoom());

    const url = generateUrl("getRoom");
    try {
      const { data } = await api.setMethod("GET").setParams({ userName }).query(url);

      const chatState = getState().chat;
      const roomIndex = chatState.data.findIndex((room) => room.id === data.id);
      const rooms = roomIndex !== -1 || !data ? [...chatState.data] : [...chatState.data, { ...data }];

      if (roomIndex !== -1) {
        rooms[roomIndex].unreadMessageCount = 0;
      }

      dispatch(receiveGetRoom(rooms, data));
    } catch (e) {
      return dispatch(errorGetRoom(e));
    }
  };
}
