import { generateUrl } from "../../../../helpers/functions";

export const GET_TOAST_NOTIFICATION_REQUEST = "GET_TOAST_NOTIFICATION_REQUEST";
export const GET_TOAST_NOTIFICATION_SUCCESS = "GET_TOAST_NOTIFICATION_SUCCESS";
export const GET_TOAST_NOTIFICATION_FAILURE = "GET_TOAST_NOTIFICATION_FAILURE";

function requestGetToastNotification() {
  return {
    type: GET_TOAST_NOTIFICATION_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetToastNotification(data) {
  return {
    type: GET_TOAST_NOTIFICATION_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
    },
  };
}

function errorGetToastNotification(message) {
  return {
    type: GET_TOAST_NOTIFICATION_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getToastNotification(api) {
  return async (dispatch) => {
    dispatch(requestGetToastNotification());

    const url = generateUrl("getToastNotification");
    try {
      const { data } = await api.setMethod("GET").query(url);

      dispatch(receiveGetToastNotification(data));
    } catch (e) {
      dispatch(errorGetToastNotification("Error: something went wrong:", e));
    }
  };
}
