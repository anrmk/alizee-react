import { generateUrl } from "../../../helpers/functions";

export const DELETE_ROOM_HISTORY_REQUEST = "DELETE_ROOM_HISTORY_REQUEST";
export const DELETE_ROOM_HISTORY_SUCCESS = "DELETE_ROOM_HISTORY_SUCCESS";
export const DELETE_ROOM_HISTORY_FAILURE = "DELETE_ROOM_HISTORY_FAILURE";

function requestDeleteRoomHistory() {
  return {
    type: DELETE_ROOM_HISTORY_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveDeleteRoomHistory(current) {
  return {
    type: DELETE_ROOM_HISTORY_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      current,
    },
  };
}

function errorDeleteRoomHistory(message) {
  return {
    type: DELETE_ROOM_HISTORY_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function deleteRoomHistory(api, id) {
  return async (dispatch, getState) => {
    dispatch(requestDeleteRoomHistory());

    const url = generateUrl("deleteRoomHistory");
    try {
      await api.setMethod("DELETE").setParams({ id }).query(url);

      const current = getState().chat.current;
      if (current?.id === id) {
        errorDeleteRoomHistory("");
      }

      const updatedRoom = {
        ...current,
        messages: [],
      };

      dispatch(receiveDeleteRoomHistory(updatedRoom));
    } catch (e) {
      return dispatch(errorDeleteRoomHistory(e));
    }
  };
}
