import { generateUrl } from "../../../helpers/functions";

export const UPDATE_NOTIFICATION_REQUEST = "UPDATE_NOTIFICATION_REQUEST";
export const UPDATE_NOTIFICATION_SUCCESS = "UPDATE_NOTIFICATION_SUCCESS";
export const UPDATE_NOTIFICATION_FAILURE = "UPDATE_NOTIFICATION_FAILURE";

function requestUpdateNotification() {
  return {
    type: UPDATE_NOTIFICATION_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveUpdateNotification(data) {
  return {
    type: UPDATE_NOTIFICATION_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
    },
  };
}

function errorUpdateNotification(message) {
  return {
    type: UPDATE_NOTIFICATION_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function updateNotification(api, opts) {
  return async (dispatch) => {
    dispatch(requestUpdateNotification());

    const url = generateUrl("updateNotification");
    try {
      await api
        .setData({
          like: opts.like,
          comment: opts.comment,
          tagging: opts.tagging,
          subscriber: opts.subscriber,
          acceptedRequest: opts.acceptedRequest,
          tip: opts.tip,
          purchase: opts.purchase,
        })
        .query(url);

      dispatch(receiveUpdateNotification(opts));
    } catch (e) {
      dispatch(errorUpdateNotification("Error: something went wrong:", e));
    }
  };
}
