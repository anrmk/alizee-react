import { generateUrl } from '../../helpers/functions';
import { USER_TOKEN } from '../../constants/user';

export const SIGNIN_REQUEST = 'SIGNIN_REQUEST';
export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN_FAILURE = 'SIGNIN_FAILURE';
export const SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS';

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
      userInfo
    }
  }
}

function errorSignIn(message) {
  return {
    type: SIGNIN_FAILURE,
    payload: {
      isFetching: false,
      isAuthenticated: false,
      errorMessage: message
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
      const { status, data } = await api
        .setData({
          userName: creds.userName,
          password: creds.password,
          rememberMe: creds.rememberMe
        })
        .query(url);

      if (status !== 200) {
        return dispatch(errorSignIn(data.message));
      }

      if (creds.rememberMe) {
        localStorage.setItem(USER_TOKEN, data.token);
      }

      dispatch(receiveSignIn(data));
    } catch {
      dispatch(errorSignIn("Error: SignIn"));
    }
  }
}

export function signOutUser(api) {
  return dispatch => {
    localStorage.removeItem(USER_TOKEN);
    dispatch(successSignOut());
  }
}