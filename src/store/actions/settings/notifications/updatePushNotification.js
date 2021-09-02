import { generateUrl } from "../../../../helpers/functions";
import { IDLE, SUCCESS, FAILURE } from "../../../../constants/request_status";

export const UPDATE_PUSH_NOTIFICATION_REQUEST =
  "UPDATE_PUSH_NOTIFICATION_REQUEST";
export const UPDATE_PUSH_NOTIFICATION_SUCCESS =
  "UPDATE_PUSH_NOTIFICATION_SUCCESS";
export const UPDATE_PUSH_NOTIFICATION_FAILURE =
  "UPDATE_PUSH_NOTIFICATION_FAILURE";

function requestUpdatePushNotification() {
  return {
    type: UPDATE_PUSH_NOTIFICATION_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
      requestStatus: IDLE,
    },
  };
}

function receiveUpdatePushNotification(data) {
  return {
    type: UPDATE_PUSH_NOTIFICATION_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
      requestStatus: SUCCESS,
    },
  };
}

function errorUpdatePushNotification(message) {
  return {
    type: UPDATE_PUSH_NOTIFICATION_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
      requestStatus: FAILURE,
    },
  };
}

export function updatePushNotification(api, opts) {
  return async (dispatch) => {
    dispatch(requestUpdatePushNotification());
    const url = generateUrl("updatePushNotification");
    try {
      await api.setData(opts).setParams({ id: opts.id }).query(url);

      dispatch(receiveUpdatePushNotification(opts));
    } catch (e) {
      dispatch(errorUpdatePushNotification("Error: something went wrong:", e));
    }
  };
}
