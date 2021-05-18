import { generateUrl } from "../../../../helpers/functions";

export const UPDATE_SITE_NOTIFICATION_REQUEST = "UPDATE_SITE_NOTIFICATION_REQUEST";
export const UPDATE_SITE_NOTIFICATION_SUCCESS = "UPDATE_SITE_NOTIFICATION_SUCCESS";
export const UPDATE_SITE_NOTIFICATION_FAILURE = "UPDATE_SITE_NOTIFICATION_FAILURE";

function requestUpdateSiteNotification() {
  return {
    type: UPDATE_SITE_NOTIFICATION_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
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
    },
  };
}

function errorUpdateSiteNotification(message) {
  return {
    type: UPDATE_SITE_NOTIFICATION_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
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
