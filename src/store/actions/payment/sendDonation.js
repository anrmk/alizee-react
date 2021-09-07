import { generateUrl } from "../../../helpers/functions";
import { getBalance } from "../account";
import { IDLE, SUCCESS, FAILURE } from "../../../constants/request_status";

export const SEND_DONATION_REQUEST = "SEND_DONATION_REQUEST";
export const SEND_DONATION_SUCCESS = "SEND_DONATION_SUCCESS";
export const SEND_DONATION_FAILURE = "SEND_DONATION_FAILURE";

function requestSendDonation() {
  return {
    type: SEND_DONATION_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
      requestStatus: IDLE,
    },
  };
}

function receiveSendDonation() {
  return {
    type: SEND_DONATION_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      requestStatus: SUCCESS,
    },
  };
}

function errorSendDonation(message) {
  return {
    type: SEND_DONATION_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
      requestStatus: FAILURE,
    },
  };
}

export function sendDonation(api, opts) {
  return async (dispatch) => {
    dispatch(requestSendDonation());

    const url = generateUrl("sendDonation");

    try {
      await api.setData(opts).query(url);

      dispatch(receiveSendDonation());
      dispatch(getBalance(api));
    } catch (e) {
      dispatch(errorSendDonation("Error: something went wrong"));
    }
  };
}
