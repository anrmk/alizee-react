import { BANK_VERIF_STATUS_NONE } from "../../../../constants/banking_form_types";
import { generateUrl } from "../../../../helpers/functions";
import { IDLE, SUCCESS, FAILURE } from "../../../../constants/request_status";

export const RESET_BANK_ACCOUNT_REQUEST = "RESET_BANK_ACCOUNT_REQUEST";
export const RESET_BANK_ACCOUNT_SUCCESS = "RESET_BANK_ACCOUNT_SUCCESS";
export const RESET_BANK_ACCOUNT_FAILURE = "RESET_BANK_ACCOUNT_FAILURE";

function requestResetBankAccount() {
  return {
    type: RESET_BANK_ACCOUNT_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
      requestStatus: IDLE,
    },
  };
}

function receiveResetBankAccount(data) {
  return {
    type: RESET_BANK_ACCOUNT_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
      requestStatus: SUCCESS,
    },
  };
}

function errorResetBankAccount(message) {
  return {
    type: RESET_BANK_ACCOUNT_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
      requestStatus: FAILURE,
    },
  };
}

export function resetBankAccount(api) {
  return async (dispatch) => {
    dispatch(requestResetBankAccount());

    const url = generateUrl("resetBankAccount");
    try {
      await api.setMethod("DELETE").query(url);

      const accountInfo = {
        account: {
          name: "",
          accountNumber: "",
          routingNumber: "",
          type: 0,
          verifyStatus: BANK_VERIF_STATUS_NONE,
        },
      };

      dispatch(receiveResetBankAccount(accountInfo));
    } catch (e) {
      dispatch(errorResetBankAccount("Error: something went wrong:", e));
    }
  };
}
