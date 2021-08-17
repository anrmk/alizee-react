import { generateUrl } from "../../../helpers/functions";
import { getDeposit } from "../account";

export const SEND_DONATION_REQUEST = "SEND_DONATION_REQUEST";
export const SEND_DONATION_SUCCESS = "SEND_DONATION_SUCCESS";
export const SEND_DONATION_FAILURE = "SEND_DONATION_FAILURE";

function requestSendDonation() {
  return {
    type: SEND_DONATION_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveSendDonation() {
  return {
    type: SEND_DONATION_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
    },
  };
}

function errorSendDonation(message) {
  return {
    type: SEND_DONATION_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
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
      dispatch(getDeposit(api));
      return true;
    } catch (e) {
      dispatch(errorSendDonation("Error: something went wrong"));
      return false;
    }
  };
}
