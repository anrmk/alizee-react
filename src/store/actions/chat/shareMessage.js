import { generateUrl } from "../../../helpers/functions";

export const SHARE_MESSAGE_REQUEST = "SHARE_MESSAGE_REQUEST";
export const SHARE_MESSAGE_SUCCESS = "SHARE_MESSAGE_SUCCESS";
export const SHARE_MESSAGE_FAILURE = "SHARE_MESSAGE_FAILURE";

function requestCreateMessage() {
  return {
    type: SHARE_MESSAGE_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveShareMessage() {
  return {
    type: SHARE_MESSAGE_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: ""
    },
  };
}

function errorShareMessage(message) {
  return {
    type: SHARE_MESSAGE_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function shareMessage(api, opts) {
  return async (dispatch) => {
    dispatch(requestCreateMessage());

    const url = generateUrl("shareMessage");
    try {
      const { followersUsernames, message, type } = opts;
      await api
        .setData({ 
          followersUsernames, 
          message,
          type
        })
        .query(url);

      dispatch(receiveShareMessage());
    } catch (e) {
      dispatch(errorShareMessage(e));
    }
  };
}
