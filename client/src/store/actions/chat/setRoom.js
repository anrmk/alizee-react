import { createRoom } from "./createRoom";
import { getRoom } from "./getRoom";

export const SET_ROOM_SUCCESS = "GET_ROOM_SUCCESS";

function receiveSetRoom() {
  return {
    type: SET_ROOM_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
    }
  };
}

export function setRoom(api, userName) {
  return async (dispatch, getState) => {
    const chatState = getState().chat;

    const checkExistingRoom = () => {
      return chatState.data.some(room => room.userName === userName)
    }

    if (checkExistingRoom()) {
      await dispatch(getRoom(api, userName));
    } else {
      await dispatch(createRoom(api, userName));
    }
  };
}
