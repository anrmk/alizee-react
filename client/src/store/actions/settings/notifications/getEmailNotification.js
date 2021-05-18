import { generateUrl } from "../../../../helpers/functions";

export const GET_EMAIL_NOTIFICATION_REQUEST = "GET_EMAIL_NOTIFICATION_REQUEST";
export const GET_EMAIL_NOTIFICATION_SUCCESS = "GET_EMAIL_NOTIFICATION_SUCCESS";
export const GET_EMAIL_NOTIFICATION_FAILURE = "GET_EMAIL_NOTIFICATION_FAILURE";

function requestGetEmailNotification() {
  return {
    type: GET_EMAIL_NOTIFICATION_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetEmailNotification(data) {
  return {
    type: GET_EMAIL_NOTIFICATION_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
    },
  };
}

function errorGetEmailNotification(message) {
  return {
    type: GET_EMAIL_NOTIFICATION_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getEmailNotification(api) {
  return async (dispatch) => {
    dispatch(requestGetEmailNotification());

    const url = generateUrl("getEmailNotification");
    try {
      const { data } = await api.setMethod("GET").query(url);

      dispatch(receiveGetEmailNotification(data));
    } catch (e) {
      dispatch(errorGetEmailNotification("Error: something went wrong:", e));
    }
  };
}
