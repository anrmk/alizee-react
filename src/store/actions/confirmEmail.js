import { generateUrl } from "../../helpers/functions";
import { signInUser } from "./signIn";

export const EMAIL_CONFIRM_REQUEST = "EMAIL_CONFIRM_REQUEST";
export const EMAIL_CONFIRM_SUCCESS = "EMAIL_CONFIRM_SUCCESS";
export const EMAIL_CONFIRM_FAILURE = "EMAIL_CONFIRM_FAILURE";

function requestConfirmEmail() {
  return {
    type: EMAIL_CONFIRM_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveConfirmEmail(confirmingInfo) {
  return {
    type: EMAIL_CONFIRM_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: confirmingInfo,
      isConfirmed: true,
    },
  };
}

function errorConfirmEmail(message, status) {
  return {
    type: EMAIL_CONFIRM_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
      errorStatus: status,
    },
  };
}

export function confirmEmail(api, creds) {
  return async (dispatch) => {
    dispatch(requestConfirmEmail());

    const url = generateUrl("confirmEmail");
    try {
      const { data } = await api
        .setMethod("GET")
        .setParams({
          password: creds.password,
          email: creds.email,
          token: creds.token,
        })
        .query(url);

      dispatch(receiveConfirmEmail(data));
      dispatch(signInUser(data, api));
    } catch (e) {
      dispatch(errorConfirmEmail(e.message, e.response?.status || 500));
    }
  };
}
