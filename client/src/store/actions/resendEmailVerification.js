import { generateUrl } from '../../helpers/functions';

export const RESENDEMAILVERIFICATION_REQUEST = 'RESENDEMAILVERIFICATION_REQUEST';
export const RESENDEMAILVERIFICATION_SUCCESS = 'RESENDEMAILVERIFICATION_SUCCESS';
export const RESENDEMAILVERIFICATION_FAILURE = 'RESENDEMAILVERIFICATION_FAILURE';

function requestResendEmailVerification(email) {
  return {
    type: RESENDEMAILVERIFICATION_REQUEST,
    payload: {
      isFetching: true,
      isReceived: false,
      errorMessage: '',
      email: email
    }
  }
}

function receiveResendEmailVerification() {
  return {
    type: RESENDEMAILVERIFICATION_SUCCESS,
    payload: {
      isFetching: false,
      isReceived: true,
      errorMessage: ''
    }
  }
}

function errorResendEmailVerification(message, status) {
  return {
    type: RESENDEMAILVERIFICATION_FAILURE,
    payload: {
      isFetching: false,
      isReceived: false,
      errorMessage: message,
      errorStatus: status
    }
  }
}

export function resendEmailVerification(email, api) {
  return async dispatch => {
    dispatch(requestResendEmailVerification(email));

    const url = generateUrl("resendEmailVerification");
    try {
      const { status, data } = await api
        .setMethod("GET")
        .setParams({
          email: email
        })
        .query(url);

      dispatch(receiveResendEmailVerification(data));
    } catch (e) {
      dispatch(errorResendEmailVerification(e.message, e.response?.status || 500));
    }
  }
}
