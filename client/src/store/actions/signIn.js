import { generateUrl, generateFileUrl } from '../../helpers/functions';
import { USER_TOKEN } from '../../constants/user';

export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';

export const VERIFIED_SUCCESS = 'VERIFIED_SUCCESS';
export const VERIFIED_FAILURE = 'VERIFIED_FAILURE';

function requestSignIn(creds) {
  return {
    type: SIGNIN_REQUEST,
    payload: {
      isFetching: true,
      isAuthenticated: false,
      errorMessage: '',
      signInRequestData: creds
    }
  }
}

function receiveSignIn(userInfo) {
  return {
    type: SIGNIN_SUCCESS,
    payload: {
      isFetching: false,
      isAuthenticated: true,
      errorMessage: '',
      isVerified: true,
      userInfo
    }
  }
}

function errorSignIn(message, status) {
  return {
    type: SIGNIN_FAILURE,
    payload: {
      isFetching: false,
      isAuthenticated: false,
      isVerified: false,
      errorMessage: message,
      errorStatus: status
    }
  }
}

function successSignOut() {
  return {
    type: SIGNOUT_SUCCESS,
    payload: {
      isAuthenticated: false
    }
  }
}

export function signInUser(creds, api) {
  return async dispatch => {
    dispatch(requestSignIn(creds));
    const url = generateUrl("signIn");
    try {
      const { data } = await api
        .setMethod("POST")
        .setData({
          email: creds.email,
          password: creds.password,
          rememberMe: creds?.rememberMe || false
        })
        .query(url);

      localStorage.setItem(USER_TOKEN, data.token);

      const avatarUrl = data?.avatarUrl;
      if (avatarUrl) {
        data.avatarUrl = generateFileUrl(process.env.REACT_APP_TESTING_DOMAIN, avatarUrl);
      }

      dispatch(receiveSignIn(data));
    } catch(e) {
      dispatch(errorSignIn(e.message, e.response?.status || 500));
    }
  }
}

export function signOutUser(api) {
  return dispatch => {
    localStorage.removeItem(USER_TOKEN);
    dispatch(successSignOut());
  }
}
