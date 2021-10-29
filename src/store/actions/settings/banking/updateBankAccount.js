import { BANK_VERIF_STATUS_PENDING } from "../../../../constants/banking_form_types";
import { generateUrl } from "../../../../helpers/functions";
import { IDLE, SUCCESS, FAILURE } from "../../../../constants/request_status";

export const UPDATE_BANK_ACCOUNT_REQUEST = "UPDATE_BANK_ACCOUNT_REQUEST";
export const UPDATE_BANK_ACCOUNT_SUCCESS = "UPDATE_BANK_ACCOUNT_SUCCESS";
export const UPDATE_BANK_ACCOUNT_FAILURE = "UPDATE_BANK_ACCOUNT_FAILURE";

function requestUpdateBankAccount() {
  return {
    type: UPDATE_BANK_ACCOUNT_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
      requestStatus: IDLE,
    },
  };
}

function receiveUpdateBankAccount(data) {
  return {
    type: UPDATE_BANK_ACCOUNT_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
      requestStatus: SUCCESS,
    },
  };
}

function errorUpdateBankAccount(message) {
  return {
    type: UPDATE_BANK_ACCOUNT_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
      requestStatus: FAILURE,
    },
  };
}

export function updateBankAccount(api, data) {
  return async (dispatch) => {
    dispatch(requestUpdateBankAccount());

    const url = generateUrl("updateBankAccount");
    try {
      await api.setMethod("PUT").setData(data).query(url);

      const userInfo = {
        account: {
          accountNumber: data.accountNumber,
          routingNumber: data.routingNumber,
          type: data.type,
          verifyStatus: BANK_VERIF_STATUS_PENDING,
        },
      };

      dispatch(receiveUpdateBankAccount(userInfo));
    } catch (e) {
      dispatch(errorUpdateBankAccount("Error: something went wrong:", e));
    }
  };
}
