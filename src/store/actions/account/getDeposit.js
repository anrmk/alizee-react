import { generateUrl } from "../../../helpers/functions";

export const GET_USER_DEPOSIT_REQUEST = "GET_USER_DEPOSIT_REQUEST";
export const GET_USER_DEPOSIT_SUCCESS = "GET_USER_DEPOSIT_SUCCESS";
export const GET_USER_DEPOSIT_FAILURE = "GET_USER_DEPOSIT_FAILURE";

function requestGetUserDeposit() {
  return {
    type: GET_USER_DEPOSIT_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetUserDeposit(data) {
  return {
    type: GET_USER_DEPOSIT_SUCCESS,
    payload: {
      isFetching: false,
      userInfo: data,
      errorMessage: "",
    },
  };
}

function errorGetUserDeposit(message) {
  return {
    type: GET_USER_DEPOSIT_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getDeposit(api) {
  return async (dispatch, getState) => {
    dispatch(requestGetUserDeposit());

    const url = generateUrl("getCurrentDeposit");
    try {
      const { data } = await api.setMethod("GET").query(url);

      const user = { ...getState().signIn?.userInfo };
      user.deposit = data.balance;

      dispatch(receiveGetUserDeposit(user));
    } catch {
      dispatch(errorGetUserDeposit("Error: something went wrong"));
    }
  };
}
