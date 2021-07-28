import { generateUrl } from "../../../helpers/functions";

export const RESET_PASSWORD_CONFIRM_REQUEST = "RESET_PASSWORD_CONFIRM_REQUEST";
export const RESET_PASSWORD_CONFIRM_SUCCESS = "RESET_PASSWORD_CONFIRM_SUCCESS";
export const RESET_PASSWORD_CONFIRM_FAILURE = "RESET_PASSWORD_CONFIRM_FAILURE";

function requestResetPasswordConfirm() {
  return {
    type: RESET_PASSWORD_CONFIRM_REQUEST,
    payload: {
      isFetching: true,
      passwordUpdated: false,
      errorMessage: "",
    },
  };
}

function receiveResetPasswordConfirm() {
  return {
    type: RESET_PASSWORD_CONFIRM_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
    },
  };
}

function errorResetPasswordConfirm(message) {
  return {
    type: RESET_PASSWORD_CONFIRM_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getPasswordConfirm(api, email) {
  return async (dispatch) => {
    dispatch(requestResetPasswordConfirm());

    const url = generateUrl("getPasswordConfirm");
    try {
      await api.setMethod("POST").setParams({ email }).query(url);

      dispatch(receiveResetPasswordConfirm());
    } catch (e) {
      dispatch(errorResetPasswordConfirm(e.message));
    }
  };
}
