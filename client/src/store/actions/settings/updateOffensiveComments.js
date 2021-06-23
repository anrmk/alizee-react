import { generateUrl } from "../../../helpers/functions";

export const UPDATE_OFFENSIVE_COMMENTS_REQUEST = 'UPDATE_OFFENSIVE_COMMENTS_REQUEST';
export const UPDATE_OFFENSIVE_COMMENTS_SUCCESS = 'UPDATE_OFFENSIVE_COMMENTS_SUCCESS';
export const UPDATE_OFFENSIVE_COMMENTS_FAILURE = 'UPDATE_OFFENSIVE_COMMENTS_FAILURE';

function requestUpdateOffensiveComments() {
  return {
    type: UPDATE_OFFENSIVE_COMMENTS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: ''
    }
  }
}

function receiveUpdateOffensiveComments(data) {
  return {
    type: UPDATE_OFFENSIVE_COMMENTS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: '',
      data: data || {}
    }
  }
}

function errorUpdateOffensiveComments(message) {
  return {
    type: UPDATE_OFFENSIVE_COMMENTS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    }
  }
}

export function updateOffensiveComments(api, status) {
  return async (dispatch, getState) => {
    dispatch(requestUpdateOffensiveComments());

    const url = generateUrl('updateOffensiveComments');
    try {
      await api
        .setParams({
          hide: status,
        })
        .query(url);

      const updatedSettings = { 
        ...getState().settings.data,
        offensiveCommentsHidden: status
      }

      dispatch(receiveUpdateOffensiveComments(updatedSettings));
	  return true
  } catch (e) {
      dispatch(errorUpdateOffensiveComments("Error: something went wrong:", e));
	  return false
    }
  }
}
