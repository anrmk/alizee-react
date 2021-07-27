import { generateUrl, redirect } from "../../../helpers/functions";

export const VERIFY_ME_REQUEST = "VERIFY_ME_REQUEST";
export const VERIFY_ME_SUCCESS = "VERIFY_ME_SUCCESS";
export const VERIFY_ME_FAILURE = "VERIFY_ME_FAILURE";

function requestVerifyMe() {
  return {
    type: VERIFY_ME_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveVerifyMe() {
  return {
    type: VERIFY_ME_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
    },
  };
}

function errorVerifyMe(message) {
  return {
    type: VERIFY_ME_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function verifyMe(api) {
  return async (dispatch) => {
    dispatch(requestVerifyMe());

    const url = generateUrl("verifyMe");
    try {
      const { data } = await api.query(url);
      dispatch(receiveVerifyMe());

      return redirect(data, "_blank");
    } catch {
      dispatch(errorVerifyMe("Error: something went wrong"));
    }
  };
}
