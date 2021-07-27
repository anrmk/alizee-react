import { generateUrl } from "../../../helpers/functions";

export const DELETE_ROOM_REQUEST = "DELETE_ROOM_REQUEST";
export const DELETE_ROOM_SUCCESS = "DELETE_ROOM_SUCCESS";
export const DELETE_ROOM_FAILURE = "DELETE_ROOM_FAILURE";

function requestDeleteRoom() {
  return {
    type: DELETE_ROOM_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveDeleteRoom(data) {
  return {
    type: DELETE_ROOM_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data,
      current: undefined,
    },
  };
}

function errorDeleteRoom(message) {
  return {
    type: DELETE_ROOM_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function deleteRoom(api, id) {
  return async (dispatch, getState) => {
    dispatch(requestDeleteRoom());

    const url = generateUrl("deleteRoom");
    try {
      await api.setMethod("DELETE").setParams({ id }).query(url);

      const chatState = getState().chat;
      const rooms = chatState.data.filter((room) => room.id !== id);

      dispatch(receiveDeleteRoom(rooms));
    } catch (e) {
      return dispatch(errorDeleteRoom(e));
    }
  };
}
