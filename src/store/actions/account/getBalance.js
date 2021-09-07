import { generateUrl } from "../../../helpers/functions";

export const GET_USER_BALANCE_REQUEST = "GET_USER_BALANCE_REQUEST";
export const GET_USER_BALANCE_SUCCESS = "GET_USER_BALANCE_SUCCESS";
export const GET_USER_BALANCE_FAILURE = "GET_USER_BALANCE_FAILURE";

function requestGetUserBalance() {
  return {
    type: GET_USER_BALANCE_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetUserBalance(data) {
  return {
    type: GET_USER_BALANCE_SUCCESS,
    payload: {
      isFetching: false,
      userInfo: data,
      errorMessage: "",
    },
  };
}

function errorGetUserBalance(message) {
  return {
    type: GET_USER_BALANCE_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getBalance(api) {
  return async (dispatch, getState) => {
    dispatch(requestGetUserBalance());

    const url = generateUrl("getBalance");
    try {
      const { data } = await api.setMethod("GET").query(url);

      const user = { ...getState().signIn?.userInfo };
      user.deposit = data;

      dispatch(receiveGetUserBalance(user));
    } catch {
      dispatch(errorGetUserBalance("Error: something went wrong"));
    }
  };
}
