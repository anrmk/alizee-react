import { generateUrl, generateFileUrl } from '../../../helpers/functions';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILURE = 'GET_USER_FAILURE';

function requestGetUser() {
  return {
    type: GET_USER_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: '',
    }
  }
}

function receiveGetUser(user) {
  return {
    type: GET_USER_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: '',
      data: user
    }
  }
}

function errorGetUser(message) {
  return {
    type: GET_USER_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    }
  }
}

export function getUser(api, username) {
  return async dispatch => {
    dispatch(requestGetUser());

    const url = generateUrl('getUser');
    try {
      const { data } = await api
        .setMethod('GET')
        .setParams({ username })
        .query(url);

      const dataExtendedUrl = { 
        ...data, 
        avatarUrl: generateFileUrl(process.env.REACT_APP_DOMAIN, data.avatarUrl)
      };

      dispatch(receiveGetUser(dataExtendedUrl));
    } catch {
      dispatch(errorGetUser("Error: something went wrong"));
    }
  }
}