import {
  NOTIFY_CALL_SUCCESS,
  SET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATIONS_LIST_FAILURE,
  GET_NOTIFICATIONS_LIST_REQUEST,
  GET_NOTIFICATIONS_LIST_SUCCESS,
  RESET_CURRENT_NOTIFICATIONS_LIST,
} from "../actions/notification";

import { NOTIFICATIONS_DEFAULT_OFFSET } from "../../constants/feed";

export default function notificationReducer(
  state = {
    isFetching: false,
    data: {
      newMessage: false,
      newNotification: false,
    },
    list: [],
    hasMore: false,
    offset: NOTIFICATIONS_DEFAULT_OFFSET,
  },
  action
) {
  switch (action.type) {
    case SET_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }

    case NOTIFY_CALL_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_NOTIFICATIONS_LIST_REQUEST: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_NOTIFICATIONS_LIST_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_NOTIFICATIONS_LIST_FAILURE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case RESET_CURRENT_NOTIFICATIONS_LIST: {
      return {
        ...state,
        ...action.payload,
      };
    }

    default:
      return state;
  }
}
