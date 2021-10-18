import { generateUrl } from "../../../helpers/functions";
import { FOLLOWERS_LENGTH, FOLLOWERS_OFFSET } from "../../../constants/feed";

import { resetRelationship } from "../relationship/resetRelationship";

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

function receiveGetUserFavorites(data, query, start, length) {
  return {
    type: GET_USER_FAVORITES_SUCCESS,
    payload: {
      isFetching: false,
      data,
      errorMessage: "",
      query,
      offset: start + FOLLOWERS_OFFSET,
      hasMore: length === FOLLOWERS_OFFSET,
    },
  };
}

function errorGetUserFavorites(message) {
  return {
    type: GET_USER_FAVORITES_FAILURE,
    payload: {
      isFetching: false,
      hasMore: false,
      errorMessage: message,
    },
  };
}

export function getFavorites(api, userName, query) {
  return async (dispatch, getState) => {
    dispatch(requestGetUserFavorites());

    const url = generateUrl("getAccountFavorites");
    try {
      if (getState().users.query !== query) {
        dispatch(resetRelationship());
      }

      const currentOffset = getState().users.offset;
      const { data } = await api
        .setMethod("GET")
        .setParams({
          userName,
          start: currentOffset,
          length: FOLLOWERS_LENGTH,
          query,
        })
        .query(url);

      dispatch(
        receiveGetUserFavorites(
          [...getState().users.data, ...data],
          query || "",
          currentOffset,
          data.length
        )
      );
    } catch {
      dispatch(errorGetUserFavorites("Error: something went wrong"));
    }
  };
}
