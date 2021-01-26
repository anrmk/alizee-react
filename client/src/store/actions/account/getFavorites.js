import { generateUrl, generateFileUrl } from "../../../helpers/functions";

export const GET_USER_FAVORITES_REQUEST = "GET_USER_FAVORITES_REQUEST";
export const GET_USER_FAVORITES_SUCCESS = "GET_USER_FAVORITES_SUCCESS";
export const GET_USER_FAVORITES_FAILURE = "GET_USER_FAVORITES_FAILURE";

function requestGetUserFavorites() {
  return {
    type: GET_USER_FAVORITES_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetUserFavorites(data) {
  return {
    type: GET_USER_FAVORITES_SUCCESS,
    payload: {
      isFetching: false,
      data,
      errorMessage: "",
    },
  };
}

function errorGetUserFavorites(message) {
  return {
    type: GET_USER_FAVORITES_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getFavorites(api, username) {
  return async (dispatch, getState) => {
    dispatch(requestGetUserFavorites());

    const url = generateUrl("getAccountFavorites");
    try {
      const { data } = await api.setMethod("GET").query(url);
      data.forEach((item) => {
        item.avatarUrl = generateFileUrl(process.env.REACT_APP_DOMAIN, item.avatarUrl);
      });

      dispatch(receiveGetUserFavorites(data));
    } catch {
      dispatch(errorGetUserFavorites("Error: something went wrong"));
    }
  };
}
