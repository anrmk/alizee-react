import { generateUrl } from "../../../helpers/functions";

export const GET_PRIVACY_REQUEST = 'GET_PRIVACY_REQUEST';
export const GET_PRIVACY_SUCCESS = 'GET_PRIVACY_SUCCESS';
export const GET_PRIVACY_FAILURE = 'GET_PRIVACY_FAILURE';

function requestGetPrivacy() {
  return {
    type: GET_PRIVACY_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: ''
    }
  }
}

function receiveGetPrivacy(data) {
  return {
    type: GET_PRIVACY_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: '',
      data: data || {}
    }
  }
}

function errorGetPrivacy(message) {
  return {
    type: GET_PRIVACY_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    }
  }
}

export function getPrivacy(api) {
  return async dispatch => {
    dispatch(requestGetPrivacy());

    const url = generateUrl('getPrivacy');
    try {
      const { data } = await api
        .setMethod('GET')
        .query(url);

      dispatch(receiveGetPrivacy(data));
  } catch (e) {
      dispatch(errorGetPrivacy("Error: something went wrong:", e));
    }
  }
}
