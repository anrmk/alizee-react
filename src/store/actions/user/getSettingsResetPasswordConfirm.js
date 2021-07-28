import { generateUrl } from "../../../helpers/functions";

export const GET_SETTINGS_RESET_PASSWORD_CONFIRM_REQUEST =
  "GET_SETTINGS_RESET_PASSWORD_CONFIRM_REQUEST";
export const GET_SETTINGS_RESET_PASSWORD_CONFIRM_SUCCESS =
  "GET_SETTINGS_RESET_PASSWORD_CONFIRM_SUCCESS";
export const GET_SETTINGS_RESET_PASSWORD_CONFIRM_FAILURE =
  "GET_SETTINGS_RESET_PASSWORD_CONFIRM_FAILURE";

function requestGetSettingsResetPasswordConfirm() {
  return {
    type: GET_SETTINGS_RESET_PASSWORD_CONFIRM_REQUEST,
    payload: {
      isFetching: true,
      passwordUpdated: false,
      errorMessage: "",
    },
  };
}

function receiveGetSettingsResetPasswordConfirm() {
  return {
    type: GET_SETTINGS_RESET_PASSWORD_CONFIRM_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
    },
  };
}

function errorGetSettingsResetPasswordConfirm(message) {
  return {
    type: GET_SETTINGS_RESET_PASSWORD_CONFIRM_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getSettingsResetPasswordConfirm(api) {
  return async (dispatch) => {
    dispatch(requestGetSettingsResetPasswordConfirm());

    const url = generateUrl("getSettingsPasswordConfirm");
    try {
      await api.setMethod("POST").query(url);

      dispatch(receiveGetSettingsResetPasswordConfirm());
      return true;
    } catch (e) {
      dispatch(errorGetSettingsResetPasswordConfirm(e.message));
      return false;
    }
  };
}
