import { getDeposit } from "../account";

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

export function setNotification(api, data) {
  return async (dispatch, getState) => {
    const notification = getState().notification.data;

    dispatch(receiveNotify({ ...notification, ...data }));

    if (data?.amount > 0) {
      await dispatch(getDeposit(api));
    }
  };
}