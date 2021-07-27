import { generateUrl } from "../../../../helpers/functions";

export const GET_SITE_NOTIFICATION_REQUEST = "GET_SITE_NOTIFICATION_REQUEST";
export const GET_SITE_NOTIFICATION_SUCCESS = "GET_SITE_NOTIFICATION_SUCCESS";
export const GET_SITE_NOTIFICATION_FAILURE = "GET_SITE_NOTIFICATION_FAILURE";

function requestGetSiteNotification() {
  return {
    type: GET_SITE_NOTIFICATION_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetSiteNotification(data) {
  return {
    type: GET_SITE_NOTIFICATION_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
    },
  };
}

function errorGetSiteNotification(message) {
  return {
    type: GET_SITE_NOTIFICATION_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getSiteNotification(api) {
  return async (dispatch) => {
    dispatch(requestGetSiteNotification());

    const url = generateUrl("getSiteNotification");
    try {
      const { data } = await api.setMethod("GET").query(url);

      dispatch(receiveGetSiteNotification(data));
    } catch (e) {
      dispatch(errorGetSiteNotification("Error: something went wrong:", e));
    }
  };
}
