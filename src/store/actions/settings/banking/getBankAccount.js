import { generateUrl } from "../../../../helpers/functions";

export const GET_BANK_ACCOUNT_REQUEST = "GET_BANK_ACCOUNT_REQUEST";
export const GET_BANK_ACCOUNT_SUCCESS = "GET_BANK_ACCOUNT_SUCCESS";
export const GET_BANK_ACCOUNT_FAILURE = "GET_BANK_ACCOUNT_FAILURE";

function requestGetBankAccount() {
  return {
    type: GET_BANK_ACCOUNT_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetBankAccount(data) {
  return {
    type: GET_BANK_ACCOUNT_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
    },
  };
}

function errorGetBankAccount(message) {
  return {
    type: GET_BANK_ACCOUNT_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getBankAccount(api) {
  return async (dispatch) => {
    dispatch(requestGetBankAccount());

    const url = generateUrl("getBankAccount");
    try {
      const { data } = await api.setMethod("GET").query(url);

      dispatch(receiveGetBankAccount(data));
    } catch (e) {
      dispatch(errorGetBankAccount("Error: something went wrong:", e));
    }
  };
}
