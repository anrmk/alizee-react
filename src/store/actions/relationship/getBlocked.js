import { generateUrl } from "../../../helpers/functions";
import { FOLLOWERS_LENGTH, FOLLOWERS_OFFSET } from "../../../constants/feed";

import { resetRelationship } from "./resetRelationship";

export const GET_BLOCK_LIST_REQUEST = "GET_BLOCK_LIST_REQUEST";
export const GET_BLOCK_LIST_SUCCESS = "GET_BLOCK_LIST_SUCCESS";
export const GET_BLOCK_LIST_FAILURE = "GET_BLOCK_LIST_FAILURE";

function requestGetBlocked() {
  return {
    type: GET_BLOCK_LIST_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetBlocked(data, query, start, length) {
  return {
    type: GET_BLOCK_LIST_SUCCESS,
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

function errorGetBlocked(message) {
  return {
    type: GET_BLOCK_LIST_FAILURE,
    payload: {
      isFetching: false,
      hasMore: false,
      errorMessage: message,
    },
  };
}

export function getBlocked(api, userName, query) {
  return async (dispatch, getState) => {
    dispatch(requestGetBlocked());

    const url = generateUrl("getBlocked");
    try {
      if (getState().users.query !== query) {
        dispatch(resetRelationship());
      }

      const currentOffset = getState().users.offset;
      const { data } = await api
        .setMethod("GET")
        .setParams({
          start: currentOffset,
          length: FOLLOWERS_LENGTH,
          query,
        })
        .query(url);

      dispatch(
        receiveGetBlocked(
          [...getState().users.data, ...data],
          query || "",
          currentOffset,
          data.length
        )
      );
    } catch (e) {
      dispatch(errorGetBlocked("Error: something went wrong:", e));
    }
  };
}
