import { generateUrl } from "../../../../helpers/functions";

export const GET_PUSH_NOTIFICATION_REQUEST = "GET_PUSH_NOTIFICATION_REQUEST";
export const GET_PUSH_NOTIFICATION_SUCCESS = "GET_PUSH_NOTIFICATION_SUCCESS";
export const GET_PUSH_NOTIFICATION_FAILURE = "GET_PUSH_NOTIFICATION_FAILURE";

function requestGetPushNotification() {
  return {
    type: GET_PUSH_NOTIFICATION_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetPushNotification(data) {
  return {
    type: GET_PUSH_NOTIFICATION_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
    },
  };
}

function errorGetPushNotification(message) {
  return {
    type: GET_PUSH_NOTIFICATION_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getPushNotification(api) {
  return async (dispatch) => {
    dispatch(requestGetPushNotification());

    const url = generateUrl("getPushNotification");
    try {
      const { data } = await api.setMethod("GET").query(url);

      dispatch(receiveGetPushNotification(data));
    } catch (e) {
      dispatch(errorGetPushNotification("Error: something went wrong:", e));
    }
  };
}
