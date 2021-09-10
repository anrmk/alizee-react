import { generateUrl } from "../../../helpers/functions";
import { getBalance } from "../account";
import { IDLE, SUCCESS, FAILURE } from "../../../constants/request_status";

export const SEND_TIP_REQUEST = "SEND_TIP_REQUEST";
export const SEND_TIP_SUCCESS = "SEND_TIP_SUCCESS";
export const SEND_TIP_FAILURE = "SEND_TIP_FAILURE";

function requestSendTip() {
  return {
    type: SEND_TIP_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
      requestStatus: IDLE,
    },
  };
}

function receiveSendTip() {
  return {
    type: SEND_TIP_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      requestStatus: SUCCESS,
    },
  };
}

function errorSendTip(message) {
  return {
    type: SEND_TIP_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
      requestStatus: FAILURE,
    },
  };
}

export function sendTip(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestSendTip());
    try {
      const url = generateUrl("sendTip");
      await api.setData(opts).query(url);

      dispatch(receiveSendTip());
      dispatch(getBalance(api));
    } catch (e) {
      dispatch(errorSendTip("Error: something went wrong"));
    }
  };
}
