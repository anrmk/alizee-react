import { generateUrl } from "../../../helpers/functions";
import { FOLLOWERS_OFFSET, FOLLOWERS_LENGTH } from "../../../constants/feed";
import { resetRelationship } from "./resetRelationship";

export const GET_FOLLOWERS_REQUEST = "GET_FOLLOWERS_REQUEST";
export const GET_FOLLOWERS_SUCCESS = "GET_FOLLOWERS_SUCCESS";
export const GET_FOLLOWERS_FAILURE = "GET_FOLLOWERS_FAILURE";

function requestGetFollowers() {
  return {
    type: GET_FOLLOWERS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetFollowers(data, query, start, length) {
  return {
    type: GET_FOLLOWERS_SUCCESS,
    payload: {
      isFetching: false,
      data,
      errorMessage: "",
      offset: start + FOLLOWERS_OFFSET,
      hasMore: length === FOLLOWERS_OFFSET,
      query,
    },
  };
}

function errorGetFollowers(message) {
  return {
    type: GET_FOLLOWERS_FAILURE,
    payload: {
      isFetching: false,
      hasMore: false,
      errorMessage: message,
    },
  };
}

export function getFollowers(api, userName, query, status) {
  return async (dispatch, getState) => {
    dispatch(requestGetFollowers());

    const url = generateUrl("getFollowers");

    try {
      if (getState().users.query !== query) {
        dispatch(resetRelationship());
      }

      const currentOffset = getState().users.offset;

      const { data } = await api
        .setMethod("GET")
        .setParams({
          userName,
          status,
          start: currentOffset,
          length: FOLLOWERS_LENGTH,
          query,
        })
        .query(url);

      dispatch(
        receiveGetFollowers(
          [...getState().users.data, ...data],
          query || "",
          currentOffset,
          data.length
        )
      );
    } catch {
      dispatch(errorGetFollowers("Error: GetFollowers"));
    }
  };
}
