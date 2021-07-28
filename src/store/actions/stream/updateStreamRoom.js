import { generateUrl } from "../../../helpers/functions";

export const UPDATE_STREAM_ROOM_REQUEST = "UPDATE_STREAM_ROOM_REQUEST";
export const UPDATE_STREAM_ROOM_SUCCESS = "UPDATE_STREAM_ROOM_SUCCESS";
export const UPDATE_STREAM_ROOM_FAILURE = "UPDATE_STREAM_ROOM_FAILURE";

function requestUpdateStreamRoom() {
  return {
    type: UPDATE_STREAM_ROOM_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveUpdateStreamRoom(data) {
  return {
    type: UPDATE_STREAM_ROOM_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data,
    },
  };
}

function errorUpdateStreamRoom(message) {
  return {
    type: UPDATE_STREAM_ROOM_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function updateStreamRoom(api, roomData) {
  return async (dispatch) => {
    dispatch(requestUpdateStreamRoom());

    try {
      const url = generateUrl("updateStreamRoom");

      const { data } = await api.setMethod("PUT").setData(roomData).query(url);

      dispatch(receiveUpdateStreamRoom(data));
    } catch (e) {
      dispatch(errorUpdateStreamRoom("Error: something went wrong"));
    }
  };
}
