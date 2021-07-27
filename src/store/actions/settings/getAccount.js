import { generateUrl } from "../../../helpers/functions";

export const GET_ACCOUNT_REQUEST = "GET_ACCOUNT_REQUEST";
export const GET_ACCOUNT_SUCCESS = "GET_ACCOUNT_SUCCESS";
export const GET_ACCOUNT_FAILURE = "GET_ACCOUNT_FAILURE";

function requestGetAccount() {
  return {
    type: GET_ACCOUNT_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetAccount(data) {
  return {
    type: GET_ACCOUNT_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
    },
  };
}

function errorGetAccount(message) {
  return {
    type: GET_ACCOUNT_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getAccount(api) {
  return async (dispatch) => {
    dispatch(requestGetAccount());

    const url = generateUrl("getAccount");
    try {
      const { data } = await api.setMethod("GET").query(url);

      dispatch(receiveGetAccount(data));
    } catch (e) {
      dispatch(errorGetAccount("Error: something went wrong:", e));
    }
  };
}
