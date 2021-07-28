import { generateUrl } from "../../../helpers/functions";
import { getDeposit } from "../account";

export const SEND_TIP_REQUEST = "SEND_TIP_REQUEST";
export const SEND_TIP_SUCCESS = "SEND_TIP_SUCCESS";
export const SEND_TIP_FAILURE = "SEND_TIP_FAILURE";

function requestSendTip() {
  return {
    type: SEND_TIP_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveSendTip() {
  return {
    type: SEND_TIP_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
    },
  };
}

function errorSendTip(message) {
  return {
    type: SEND_TIP_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function sendTip(api, userName, amount, message) {
  return async (dispatch, getState) => {
    dispatch(requestSendTip());

    try {
      const url = generateUrl("sendTip");

      await api
        .setData({
          userName,
          amount,
          message,
        })
        .query(url);

      dispatch(receiveSendTip());
      dispatch(getDeposit(api));
      return true;
    } catch (e) {
      dispatch(errorSendTip("Error: something went wrong"));
      return false;
    }
  };
}
