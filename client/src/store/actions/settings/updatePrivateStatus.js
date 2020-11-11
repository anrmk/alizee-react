import { generateUrl } from "../../../helpers/functions";

export const UPDATE_PRIVATE_STATUS_REQUEST = 'UPDATE_PRIVATE_STATUS_REQUEST';
export const UPDATE_PRIVATE_STATUS_SUCCESS = 'UPDATE_PRIVATE_STATUS_SUCCESS';
export const UPDATE_PRIVATE_STATUS_FAILURE = 'UPDATE_PRIVATE_STATUS_FAILURE';

function requestUpdatePrivateStatus() {
  return {
    type: UPDATE_PRIVATE_STATUS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: ''
    }
  }
}

function receiveUpdatePrivateStatus(data) {
  return {
    type: UPDATE_PRIVATE_STATUS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: '',
      data: data || {}
    }
  }
}

function errorUpdatePrivateStatus(message) {
  return {
    type: UPDATE_PRIVATE_STATUS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    }
  }
}

export function updatePrivateStatus(api, status) {
  return async (dispatch, getState) => {
    dispatch(requestUpdatePrivateStatus());

    const url = generateUrl('updatePrivateStatus');
    try {
      await api
        .setParams({
          isPrivate: status,
        })
        .query(url);

      const updatedSettings = { 
        ...getState().settings.data,
        accountPrivate: status
      }

      dispatch(receiveUpdatePrivateStatus(updatedSettings));
  } catch (e) {
      dispatch(errorUpdatePrivateStatus("Error: something went wrong:", e));
    }
  }
}
