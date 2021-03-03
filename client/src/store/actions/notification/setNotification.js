export const SET_NOTIFICATION_SUCCESS = "SET_NOTIFICATION_SUCCESS";

function receiveNotify(data) {
  return {
    type: SET_NOTIFICATION_SUCCESS,
    payload: {
      isFetching: true,
      data,
      errorMessage: "",
    },
  };
}

export function setNotification(data) {
  return (dispatch, getState) => {
    var notification = getState().notification.data;
    dispatch(receiveNotify({...notification, ...data}));
  };
}