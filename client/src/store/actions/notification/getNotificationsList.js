import { generateUrl, getOffset } from "../../../helpers/functions";
import { NOTIFICATION_OFFSET, NOTIFICATION_LENGTH } from "../../../constants/feed";

export const GET_NOTIFICATIONS_LIST_REQUEST = "GET_NOTIFICATIONS_LIST_REQUEST";
export const GET_NOTIFICATIONS_LIST_SUCCESS = "GET_NOTIFICATIONS_LIST_SUCCESS";
export const GET_NOTIFICATIONS_LIST_FAILURE = "GET_NOTIFICATIONS_LIST_FAILURE";
export const RESET_CURRENT_NOTIFICATIONS_LIST = "RESET_CURRENT_NOTIFICATIONS_LIST";

function requestGetNotificationList() {
  return {
    type: GET_NOTIFICATIONS_LIST_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetNotificationList(data, total, start, hasMore) {
  return {
    type: GET_NOTIFICATIONS_LIST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      offset: getOffset(start, total, NOTIFICATION_OFFSET),
      list: data || [],
      hasMore,
      count: total,
    },
  };
}

function errorGetNotificationList(message) {
  return {
    type: GET_NOTIFICATIONS_LIST_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function resetCurrentNotificationList() {
  return {
    type: RESET_CURRENT_NOTIFICATIONS_LIST,
    payload: {
      isFetching: false,
      list: [],
      errorMessage: "",
    },
  };
}

export function getNotificationsList(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestGetNotificationList());

    const url = generateUrl("getNotification");
    const currentOffset = getState().notification.offset;
    try {
      const { data } = await api
        .setMethod("GET")
        .setParams({
          type: opts.type,
          start: currentOffset,
          length: NOTIFICATION_LENGTH,
        })
        .query(url);

      dispatch(receiveGetNotificationList(data));
    } catch {
      dispatch(errorGetNotificationList("Error: something went wrong"));
    }
  };
}
