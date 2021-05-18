import { generateUrl } from "../../../../helpers/functions";

export const UPDATE_TOAST_NOTIFICATION_REQUEST = "UPDATE_TOAST_NOTIFICATION_REQUEST";
export const UPDATE_TOAST_NOTIFICATION_SUCCESS = "UPDATE_TOAST_NOTIFICATION_SUCCESS";
export const UPDATE_TOAST_NOTIFICATION_FAILURE = "UPDATE_TOAST_NOTIFICATION_FAILURE";

function requestUpdateToastNotification() {
  return {
    type: UPDATE_TOAST_NOTIFICATION_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveUpdateToastNotification(data) {
  return {
    type: UPDATE_TOAST_NOTIFICATION_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
    },
  };
}

function errorUpdateToastNotification(message) {
  return {
    type: UPDATE_TOAST_NOTIFICATION_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function updateToastNotification(api, opts) {
  return async (dispatch) => {
    dispatch(requestUpdateToastNotification());

    const url = generateUrl("updateToastNotification");
    try {
      await api.setData(opts).query(url);

      dispatch(receiveUpdateToastNotification(opts));
    } catch (e) {
      dispatch(errorUpdateToastNotification("Error: something went wrong:", e));
    }
  };
}
