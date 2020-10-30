import { generateUrl, generateFileUrl } from "../../../helpers/functions";

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

function receiveGetRoom(room) {
  return {
    type: GET_ROOM_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      currentRoom: room,
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

export function getRoom(api, id) {
  return async (dispatch) => {
    dispatch(requestGetRoom());

    const url = generateUrl("getRoom");
    try {
      const { data } = await api.setMethod("GET").setParams({ id }).query(url);

      data.avatarUrl = generateFileUrl(
        process.env.REACT_APP_DOMAIN,
        data.avatarUrl
      );

      dispatch(receiveGetRoom(data));
    } catch (e) {
      return dispatch(errorGetRoom(e));
    }
  };
}
