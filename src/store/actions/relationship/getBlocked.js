import { generateUrl } from "../../../helpers/functions";

export const GET_BLOCK_LIST_REQUEST = "GET_BLOCK_LIST_REQUEST";
export const GET_BLOCK_LIST_SUCCESS = "GET_BLOCK_LIST_SUCCESS";
export const GET_BLOCK_LIST_FAILURE = "GET_BLOCK_LIST_FAILURE";

function requestGetBlocked() {
  return {
    type: GET_BLOCK_LIST_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetBlocked(data) {
  return {
    type: GET_BLOCK_LIST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data,
    },
  };
}

function errorGetBlocked(message) {
  return {
    type: GET_BLOCK_LIST_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getBlocked(api) {
  return async (dispatch) => {
    dispatch(requestGetBlocked());

    const url = generateUrl("getBlocked");
    try {
      const { data } = await api.setMethod("GET").query(url);

      dispatch(receiveGetBlocked(data));
    } catch (e) {
      dispatch(errorGetBlocked("Error: something went wrong:", e));
    }
  };
}
