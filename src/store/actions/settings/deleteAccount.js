import { generateUrl } from "../../../helpers/functions";
import { signOutUser } from "../signIn";
import { IDLE, SUCCESS, FAILURE } from "../../../constants/request_status";

export const DELETE_ACCOUNT_REQUEST = "DELETE_ACCOUNT_REQUEST";
export const DELETE_ACCOUNT_SUCCESS = "DELETE_ACCOUNT_SUCCESS";
export const DELETE_ACCOUNT_FAILURE = "DELETE_ACCOUNT_FAILURE";

function requestDeleteAccount() {
  return {
    type: DELETE_ACCOUNT_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
      requestStatus: IDLE,
    },
  };
}

function receiveDeleteAccount() {
  return {
    type: DELETE_ACCOUNT_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      requestStatus: SUCCESS,
    },
  };
}

function errorDeleteAccount(message) {
  return {
    type: DELETE_ACCOUNT_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
      requestStatus: FAILURE,
    },
  };
}

export function deleteAccount(api) {
  return async (dispatch) => {
    dispatch(requestDeleteAccount());

    const url = generateUrl("deleteAccount");
    try {
      await api.setMethod("DELETE").query(url);

      dispatch(receiveDeleteAccount());

      dispatch(signOutUser());
    } catch (e) {
      dispatch(errorDeleteAccount("Error: something went wrong:", e));
    }
  };
}
