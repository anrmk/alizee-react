import { generateUrl } from "../../../helpers/functions";
import { USER_TOKEN } from '../../../constants/user';

export const RESET_PASSWORD_REQUEST = "RESET_PASSWORD_REQUEST";
export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";
export const RESET_PASSWORD_FAILURE = "RESET_PASSWORD_FAILURE";

function requestResetPassword() {
  return {
    type: RESET_PASSWORD_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: ""
    }
  }
}

function receiveResetPassword() {
  return {
    type: RESET_PASSWORD_SUCCESS,
    payload: {
      isFetching: false,
      passwordUpdated: true,
      errorMessage: ""
    }
  }
}

function errorResetPassword(message) {
  return {
    type: RESET_PASSWORD_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    }
  }
}

export function resetPassword(api, opts) {
  return async dispatch => {
    dispatch(requestResetPassword());

    const url = generateUrl("updatePassword");
    try {
      const { data } = await api
        .setMethod("POST")
        .setParams({ 
          token: opts?.token,
          email: opts?.email,
          newPassword: opts?.password
        })
        .query(url);

      if (data?.authToken) {
        localStorage.setItem(USER_TOKEN, data.authToken);
      }

      dispatch(receiveResetPassword());
    } catch(e) {
      console.log("HERE ERROR", e.message)
      dispatch(errorResetPassword(e.message));
    }
  }
}
