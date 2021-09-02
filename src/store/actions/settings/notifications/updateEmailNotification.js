import { generateUrl } from "../../../../helpers/functions";
import { IDLE, SUCCESS, FAILURE } from "../../../../constants/request_status";

export const UPDATE_EMAIL_NOTIFICATION_REQUEST =
  "UPDATE_EMAIL_NOTIFICATION_REQUEST";
export const UPDATE_EMAIL_NOTIFICATION_SUCCESS =
  "UPDATE_EMAIL_NOTIFICATION_SUCCESS";
export const UPDATE_EMAIL_NOTIFICATION_FAILURE =
  "UPDATE_EMAIL_NOTIFICATION_FAILURE";

function requestUpdateEmailNotification() {
  return {
    type: UPDATE_EMAIL_NOTIFICATION_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
      requestStatus: IDLE,
    },
  };
}

function receiveUpdateEmailNotification(data) {
  return {
    type: UPDATE_EMAIL_NOTIFICATION_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
      requestStatus: SUCCESS,
    },
  };
}

function errorUpdateEmailNotification(message) {
  return {
    type: UPDATE_EMAIL_NOTIFICATION_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
      requestStatus: FAILURE,
    },
  };
}

export function updateEmailNotification(api, opts) {
  return async (dispatch) => {
    dispatch(requestUpdateEmailNotification());

    const url = generateUrl("updateEmailNotification");
    try {
      await api.setData(opts).query(url);

      dispatch(receiveUpdateEmailNotification(opts));
    } catch (e) {
      dispatch(errorUpdateEmailNotification("Error: something went wrong:", e));
    }
  };
}
