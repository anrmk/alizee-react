import { generateUrl } from '../../helpers/functions';
import { SOCIAL_GOOGLE } from '../../constants/social_types';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const SIGNUP_SOCIAL_REQUEST = 'SIGNUP_SOCIAL_REQUEST';
export const SIGNUP_SOCIAL_SUCCESS = 'SIGNUP_SOCIAL_SUCCESS';
export const SIGNUP_SOCIAL_FAILURE = 'SIGNUP_SOCIAL_FAILURE';

function requestSignUp(creds) {
  return {
    type: SIGNUP_REQUEST,
    payload: {
      isFetching: true,
      isSignUp: false,
      errorMessage: '',
      signUpData: creds
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

export function requestSignUpSocial() {
  return async dispatch => dispatch({
    type: SIGNUP_SOCIAL_REQUEST,
    payload: {
      isFetching: true,
      isSignUpSocial: false,
      errorMessage: ''
    }
  });
}

function receiveSignUpSocial() {
  return {
    type: SIGNUP_SOCIAL_SUCCESS,
    payload: {
      isFetching: false,
      isSignUpSocial: true,
      errorMessage: ''
    }
  }
}

export function errorSignUpSocial(message) {
  return async dispatch => dispatch({
    type: SIGNUP_SOCIAL_FAILURE,
    payload: {
      isFetching: false,
      isSignUpSocial: false,
      errorMessage: message
    }
  });
}

export function signUpUser(creds, api) {
  return async dispatch => {
    dispatch(requestSignUp(creds));

    const url = generateUrl("signUp");
    try {
      const { status, data } = await api
        .setData({
          name: creds.name,
          surname: creds.surname,
          birthday: creds.birthday,
          userName: creds.username,
          email: creds.email,
          phoneNumber: creds.phoneNumber,
          avatarUrl: creds.imageUrl
        })
        .query(url);

      if (status !== 201) {
        return dispatch(errorSignUp(data.message));
      }

      dispatch(receiveSignUp(data));
    } catch (e) {
      console.error(e);
      dispatch(errorSignUp("Error: SignUp"));
    }
  }
}

export function signUpSocial(socialType, socialData, api) {
  return async dispatch => { 
    dispatch(receiveSignUpSocial());

    if (!socialData || !socialType) 
      return dispatch(errorSignUpSocial("Error: Social media data is empty or Social media unknown"));

    let creds = {}
    if (socialType === SOCIAL_GOOGLE) {
      creds = {
        name: socialData?.profileObj?.givenName,
        surname: socialData?.profileObj?.familyName,
        birthday: socialData?.profileObj?.birthday,
        username: socialData?.profileObj?.email,
        email: socialData?.profileObj?.email,
        phoneNumber: socialData?.profileObj?.phoneNumber,
        imageUrl: socialData?.profileObj?.imageUrl
      }
    }

    dispatch(signUpUser(creds, api));
  }
}
