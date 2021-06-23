import { generateUrl } from "../../../helpers/functions";
import { USER_TOKEN } from "../../../constants/user";

export const UPDATE_ACCOUNT_REQUEST = "UPDATE_ACCOUNT_REQUEST";
export const UPDATE_ACCOUNT_SUCCESS = "UPDATE_ACCOUNT_SUCCESS";
export const UPDATE_ACCOUNT_FAILURE = "UPDATE_ACCOUNT_FAILURE";
export const UPDATE_ACCOUNT_RESET = "UPDATE_ACCOUNT_RESET";

function requestUpdateAccount() {
  return {
    type: UPDATE_ACCOUNT_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveUpdateAccount(data) {
  return {
    type: UPDATE_ACCOUNT_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      userInfo: data || {},
    },
  };
}

function errorUpdateAccount(message) {
  return {
    type: UPDATE_ACCOUNT_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function updateAccount(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestUpdateAccount());

    try {
      const url = generateUrl("updateAccount");
      const { data } = await api.setMethod("PUT").setData(opts).query(url);

      const oldUserInfo = getState().signIn?.userInfo;
      dispatch(receiveUpdateAccount({ ...oldUserInfo, ...data }));

      localStorage.setItem(
        USER_TOKEN,
        JSON.stringify({
          access: data.accessToken,
          refresh: data.refreshToken,
        })
      );
      return true;
    } catch (e) {
      dispatch(errorUpdateAccount("Error: something went wrong:", e));
      return false;
    }
  };
}
