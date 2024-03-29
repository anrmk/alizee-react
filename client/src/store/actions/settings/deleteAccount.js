import { generateUrl } from "../../../helpers/functions";
import { signOutUser } from "../signIn";

export const DELETE_ACCOUNT_REQUEST = 'DELETE_ACCOUNT_REQUEST';
export const DELETE_ACCOUNT_SUCCESS = 'DELETE_ACCOUNT_SUCCESS';
export const DELETE_ACCOUNT_FAILURE = 'DELETE_ACCOUNT_FAILURE';

function requestDeleteAccount() {
  return {
    type: DELETE_ACCOUNT_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: ''
    }
  }
}

function receiveDeleteAccount() {
  return {
    type: DELETE_ACCOUNT_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: ''
    }
  }
}

function errorDeleteAccount(message) {
  return {
    type: DELETE_ACCOUNT_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    }
  }
}

export function deleteAccount(api) {
  return async dispatch => {
    dispatch(requestDeleteAccount());

    const url = generateUrl('deleteAccount');
    try {
      await api.setMethod('DELETE').query(url);

      dispatch(receiveDeleteAccount());

      dispatch(signOutUser());
	  return true
  } catch (e) {
      dispatch(errorDeleteAccount("Error: something went wrong:", e));
	  return false
    }
  }
}
