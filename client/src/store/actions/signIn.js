import { generateUrl, getUsernameFromJWT } from "../../helpers/functions";
import { SOCIAL_GOOGLE, SOCIAL_TWITTER } from "../../constants/social_types";
import { socialAuth } from "./socialAuth";
import { USER_TOKEN } from "../../constants/user";
import { oneTimeAuth } from "./oneTimeAuth";

export const SIGNIN_REQUEST = "SIGNIN_REQUEST";
export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN_FAILURE = "SIGNIN_FAILURE";
export const SIGNOUT_SUCCESS = "SIGNOUT_SUCCESS";

export const VERIFIED_SUCCESS = "VERIFIED_SUCCESS";
export const VERIFIED_FAILURE = "VERIFIED_FAILURE";

export const SIGN_IN_RESET = "SIGN_IN_RESET";

function requestSignIn() {
  return {
    type: SIGNIN_REQUEST,
    payload: {
      isFetching: true,
      isAuthenticated: false,
      isVerified: false,
      isSocial: false,
      errorMessage: "",
    },
  };
}

export function receiveSignIn(userInfo, isSocial = false) {
  return {
    type: SIGNIN_SUCCESS,
    payload: {
      isFetching: false,
      isAuthenticated: true,
      isVerified: true,
      isSocial,
      errorMessage: "",
      userInfo,
    },
  };
}

function errorSignIn(message, status) {
  return {
    type: SIGNIN_FAILURE,
    payload: {
      isFetching: false,
      isAuthenticated: false,
      isVerified: false,
      isSocial: false,
      errorMessage: message,
      errorStatus: status,
    },
  };
}

function successSignOut() {
  return {
    type: SIGNOUT_SUCCESS,
    payload: {
      isAuthenticated: false,
    },
  };
}

export function resetSignIn() {
  return (dispatch) =>
    dispatch({
      type: SIGN_IN_RESET,
      payload: {
        isFetching: false,
        isAuthenticated: false,
        isVerified: false,
        isSocial: false,
        errorMessage: "",
        errorStatus: "",
      },
    });
}

export function signInUser(creds, api) {
  return async (dispatch) => {
    dispatch(requestSignIn());
    const url = generateUrl("signIn");
    try {
      const { data } = await api
        .setMethod("POST")
        .setData({
          email: creds.email,
          password: creds.password,
        })
        .query(url);

      localStorage.setItem(
        USER_TOKEN,
        JSON.stringify({
          access: data.accessToken,
          refresh: data.refreshToken,
        })
      );

      const usernameFromToken = getUsernameFromJWT(data.accessToken);
      if (!usernameFromToken) {
        throw new Error("User doesn't have username");
      }

      dispatch(receiveSignIn({
        userName: usernameFromToken
      }, true));
    } catch (e) {
      dispatch(errorSignIn(e.response?.data || e.message, e.response?.status || 500));
    }
  };
}

export function signInSocial(api, socialType, opts) {
  return async (dispatch, getState) => {
    dispatch(requestSignIn());

    try {
      if (socialType === SOCIAL_GOOGLE) {
        await dispatch(socialAuth(api, socialType, opts));
      } else if (socialType === SOCIAL_TWITTER) {
        await dispatch(oneTimeAuth(api, opts));
      }

      const { data, errorMessage } = getState().socialAuth;

      if (errorMessage) {
        throw errorMessage;
      }

      localStorage.setItem(
        USER_TOKEN,
        JSON.stringify({
          access: data.accessToken,
          refresh: data.refreshToken,
        })
      );

      const usernameFromToken = getUsernameFromJWT(data.accessToken);
      if (!usernameFromToken) {
        throw new Error("User doesn't have username");
      }

      dispatch(receiveSignIn({
        userName: usernameFromToken
      }, true));
    } catch (e) {
      dispatch(errorSignIn(e.response?.data || e.message, e.response?.status || 500));
    }
  };
}

export function signOutUser(api) {
  return (dispatch) => {
    localStorage.removeItem(USER_TOKEN);
    dispatch(successSignOut());
  };
}
