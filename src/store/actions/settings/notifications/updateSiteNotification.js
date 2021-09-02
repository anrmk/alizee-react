import { generateUrl } from "../../../../helpers/functions";
import { IDLE, SUCCESS, FAILURE } from "../../../../constants/request_status";

export const UPDATE_SITE_NOTIFICATION_REQUEST =
  "UPDATE_SITE_NOTIFICATION_REQUEST";
export const UPDATE_SITE_NOTIFICATION_SUCCESS =
  "UPDATE_SITE_NOTIFICATION_SUCCESS";
export const UPDATE_SITE_NOTIFICATION_FAILURE =
  "UPDATE_SITE_NOTIFICATION_FAILURE";

function requestUpdateSiteNotification() {
  return {
    type: UPDATE_SITE_NOTIFICATION_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
      requestStatus: IDLE,
    },
  };
}

function receiveUpdateSiteNotification(data) {
  return {
    type: UPDATE_SITE_NOTIFICATION_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
      requestStatus: SUCCESS,
    },
  };
}

function errorUpdateSiteNotification(message) {
  return {
    type: UPDATE_SITE_NOTIFICATION_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
      requestStatus: FAILURE,
    },
  };
}

export function updateSiteNotification(api, opts) {
  return async (dispatch) => {
    dispatch(requestUpdateSiteNotification());

    const url = generateUrl("updateSiteNotification");
    try {
      await api.setData(opts).query(url);

      dispatch(receiveUpdateSiteNotification(opts));
    } catch (e) {
      dispatch(errorUpdateSiteNotification("Error: something went wrong:", e));
    }
  };
}
