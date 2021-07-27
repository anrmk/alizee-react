import { generateUrl } from "../../../helpers/functions";

export const CREATE_STREAM_ROOM_REQUEST = "CREATE_STREAM_ROOM_REQUEST";
export const CREATE_STREAM_ROOM_SUCCESS = "CREATE_STREAM_ROOM_SUCCESS";
export const CREATE_STREAM_ROOM_FAILURE = "CREATE_STREAM_ROOM_FAILURE";

function requestCreateStreamRoom() {
  return {
    type: CREATE_STREAM_ROOM_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveCreateStreamRoom(data) {
  return {
    type: CREATE_STREAM_ROOM_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data,
    },
  };
}

function errorCreateStreamRoom(message) {
  return {
    type: CREATE_STREAM_ROOM_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function createStreamRoom(api) {
  return async (dispatch) => {
    dispatch(requestCreateStreamRoom());

    try {
      const url = generateUrl("createStreamRoom");

      const { data } = await api.query(url);

      dispatch(receiveCreateStreamRoom(data));
    } catch (e) {
      dispatch(errorCreateStreamRoom("Error: something went wrong"));
    }
  };
}
