import { BANK_VERIF_STATUS_PENDING } from "../../../constants/banking_form_types";
import { generateUrl } from "../../../helpers/functions";

export const VERIFY_BANK_ACCOUNT_REQUEST = "VERIFY_BANK_ACCOUNT_REQUEST";
export const VERIFY_BANK_ACCOUNT_SUCCESS = "VERIFY_BANK_ACCOUNT_SUCCESS";
export const VERIFY_BANK_ACCOUNT_FAILURE = "VERIFY_BANK_ACCOUNT_FAILURE";

function requestVerifyBankAccount() {
  return {
    type: VERIFY_BANK_ACCOUNT_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveVerifyBankAccount(data) {
  return {
    type: VERIFY_BANK_ACCOUNT_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
    },
  };
}

function errorVerifyBankAccount(message) {
  return {
    type: VERIFY_BANK_ACCOUNT_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function verifyBankAccount(api, data) {
  return async (dispatch) => {
    dispatch(requestVerifyBankAccount());

    const url = generateUrl("verifyBankAccount");
    try {
      await api.query(url);

      const userInfo = {
        account: {
          accountNumber: data.accountNumber,
          routingNumber: data.routingNumber,
          type: data.type,
          verifyStatus: BANK_VERIF_STATUS_PENDING,
        },
      };

      dispatch(receiveVerifyBankAccount(userInfo));
    } catch (e) {
      dispatch(errorVerifyBankAccount("Error: something went wrong:", e));
    }
  };
}
