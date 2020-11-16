import { generateUrl } from '../../helpers/functions';
import { SOCIAL_GOOGLE } from '../../constants/social_types';

export const AUTH_SOCIAL_REQUEST = 'AUTH_SOCIAL_REQUEST';
export const AUTH_SOCIAL_SUCCESS = 'AUTH_SOCIAL_SUCCESS';
export const AUTH_SOCIAL_FAILURE = 'AUTH_SOCIAL_FAILURE';

export function requestSocialAuth() {
  return async dispatch => dispatch({
    type: AUTH_SOCIAL_REQUEST,
    payload: {
      isFetching: true,
      isAuthSocial: false,
      errorMessage: ''
    }
  });
}

function receiveSocialAuth(userInfo) {
  return {
    type: AUTH_SOCIAL_SUCCESS,
    payload: {
      isFetching: false,
      isAuthSocial: true,
      errorMessage: '',
      data: userInfo || {}
    }
  }
}

export function errorSocialAuth(message) {
  return async dispatch => dispatch({
    type: AUTH_SOCIAL_FAILURE,
    payload: {
      isFetching: false,
      isAuthSocial: false,
      errorMessage: message
    }
  });
}

export function socialAuth(api, socialType, opts) {
  return async dispatch => {
    dispatch(requestSocialAuth());

    let url = "";
    if (socialType === SOCIAL_GOOGLE) {
      url = generateUrl("googleAuth");
    }

    if (!url) {
      throw "Error: undefined social type";
    }

    try {
      const { data } = await api
        .setMethod("POST")
        .setData({
          tokenId: opts?.tokenId
        })
        .query(url);

      dispatch(receiveSocialAuth(data));
    } catch (e) {
      dispatch(errorSocialAuth("Error: social authentication"));
    }
  }
}
