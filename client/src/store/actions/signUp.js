import { generateUrl, getFullName } from '../../helpers/functions';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const SIGNUP_SOCIAL_REQUEST = 'SIGNUP_SOCIAL_REQUEST';
export const SIGNUP_SOCIAL_SUCCESS = 'SIGNUP_SOCIAL_SUCCESS';
export const SIGNUP_SOCIAL_FAILURE = 'SIGNUP_SOCIAL_FAILURE';

function requestSignUp() {
  return {
    type: SIGNUP_REQUEST,
    payload: {
      isFetching: true,
      isSignUp: false,
      errorMessage: ''
    }
  }
}

function receiveSignUp(userInfo) {
  return {
    type: SIGNUP_SUCCESS,
    payload: {
      isFetching: false,
      isSignUp: true,
      errorMessage: '',
      userInfo
    }
  }
}

function errorSignUp(message) {
  return {
    type: SIGNUP_FAILURE,
    payload: {
      isFetching: false,
      isSignUp: false,
      errorMessage: message
    }
  }
}

export function signUpUser(api, creds) {
  return async dispatch => {
    dispatch(requestSignUp(creds));

    const url = generateUrl("signUp");
    try {
      const { status, data } = await api
        .setData({
          name: getFullName(creds.name, creds.surname),
          birthday: creds.birthday,
          userName: creds.username,
          email: creds.email,
          phoneNumber: creds.phoneNumber,
          avatarUrl: creds.imageUrl
        })
        .query(url, { "g-recaptcha-response": creds.token });

      if (status !== 201) {
        return dispatch(errorSignUp(data.message));
      }

      dispatch(receiveSignUp(data));
    } catch (e) {
      dispatch(errorSignUp(e.message, e.response?.status || 500));
    }
  }
}
