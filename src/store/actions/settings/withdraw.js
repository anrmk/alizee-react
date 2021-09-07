import { generateUrl } from "../../../helpers/functions";
import { getBalance } from "../account";

export const WITHDRAW_REQUEST = "WITHDRAW_REQUEST";
export const WITHDRAW_SUCCESS = "WITHDRAW_SUCCESS";
export const WITHDRAW_FAILURE = "WITHDRAW_FAILURE";

function requestWithdraw() {
  return {
    type: WITHDRAW_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveWithdraw() {
  return {
    type: WITHDRAW_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
    },
  };
}

function errorWithdraw(message) {
  return {
    type: WITHDRAW_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function withdraw(api, opts) {
  return async (dispatch) => {
    dispatch(requestWithdraw());

    const url = generateUrl("withdraw");
    try {
      await api
        .setData({
          amount: opts.withdrawFunds,
          // description: opts.withdrawDesc,
        })
        .query(url);

      dispatch(receiveWithdraw());
      dispatch(getBalance(api));
    } catch (e) {
      dispatch(errorWithdraw("Error: something went wrong:", e));
    }
  };
}
