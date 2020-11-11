import { generateUrl } from '../../../helpers/functions';

export const UPDATE_USERNAME_REQUEST = 'UPDATE_USERNAME_REQUEST';
export const UPDATE_USERNAME_SUCCESS = 'UPDATE_USERNAME_SUCCESS';
export const UPDATE_USERNAME_FAILURE = 'UPDATE_USERNAME_FAILURE';

function requestUpdateUsername() {
  return {
    type: UPDATE_USERNAME_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: '',
    }
  }
}

function receiveUpdateUsername(data) {
  return {
    type: UPDATE_USERNAME_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: '',
      userInfo: data || {}
    }
  }
}

function errorUpdateUsername(message) {
  return {
    type: UPDATE_USERNAME_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    }
  }
}

export function updateUsername(api, username) {
  return async (dispatch, getState) => {
    dispatch(requestUpdateUsername());

    const url = generateUrl('updateUsername');
    try {
      const { data } = await api
        .setParams({
          userName: username
        })
        .query(url);

      const oldUserInfo = getState().signIn?.userInfo;

      dispatch(receiveUpdateUsername({ ...oldUserInfo, ...data }));
    } catch (e) {
      dispatch(errorUpdateUsername("Error: something went wrong:", e));
    }
  }
}
