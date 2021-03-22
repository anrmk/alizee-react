import {  
  NOTIFY_CALL_SUCCESS, 
  SET_NOTIFICATION_SUCCESS, 
} from "../actions/notification";

export default function notificationReducer(
  state = {
    isFetching: false,
    data: {
      newMessage: false,
      newNotification: false
    },
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
   
    default:
      return state;
  }
}
