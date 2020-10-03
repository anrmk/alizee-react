import { generateUrl } from "../../../helpers/functions";

export const CREATE_ROOM_REQUEST = "CREATE_ROOM_REQUEST";
export const CREATE_ROOM_SUCCESS = "CREATE_ROOM_SUCCESS";
export const CREATE_ROOM_FAILURE = "CREATE_ROOM_FAILURE";

function requestCreateRoom() {
  return {
    type: CREATE_ROOM_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveCreateRoom(room) {
  return {
    type: CREATE_ROOM_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: room,
    },
  };
}

function errorCreateRoom(message) {
  return {
    type: CREATE_ROOM_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function createRoom(api, id) {
  console.log("CreateRoom action", api, id)
  return async (dispatch) => {
    dispatch(requestCreateRoom());

    const url = generateUrl("createRoom");
    try {
      const { status, data } = await api.setParams({ id }).query(url);

      if (status !== 200) {
        throw data?.message; 
      }

      dispatch(receiveCreateRoom(data));
    } catch (e) {
      return dispatch(errorCreateRoom(e));
    }
  };
}
