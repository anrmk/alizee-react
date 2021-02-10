import { generateUrl } from "../../../helpers/functions";

export const GET_NOTIFICATION_REQUEST = "GET_NOTIFICATION_REQUEST";
export const GET_NOTIFICATION_SUCCESS = "GET_NOTIFICATION_SUCCESS";
export const GET_NOTIFICATION_FAILURE = "GET_NOTIFICATION_FAILURE";

function requestGetNotification() {
  return {
    type: GET_NOTIFICATION_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetNotification(data) {
  return {
    type: GET_NOTIFICATION_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
    },
  };
}

function errorGetNotification(message) {
  return {
    type: GET_NOTIFICATION_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getNotification(api) {
  return async (dispatch) => {
    dispatch(requestGetNotification());

    const url = generateUrl("getNotification");
    try {
      const { data } = await api.setMethod("GET").query(url);

      dispatch(receiveGetNotification(data));
    } catch (e) {
      dispatch(errorGetNotification("Error: something went wrong:", e));
    }
  };
}
