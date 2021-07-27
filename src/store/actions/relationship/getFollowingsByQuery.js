import { SEARCH_LENGTH, SEARCH_OFFSET } from "../../../constants/search";
import { generateUrl } from "../../../helpers/functions";

export const GET_FOLLOWINGS_BY_QUERY_REQUEST = "GET_FOLLOWINGS_BY_QUERY_REQUEST";
export const GET_FOLLOWINGS_BY_QUERY_SUCCESS = "GET_FOLLOWINGS_BY_QUERY_SUCCESS";
export const GET_FOLLOWINGS_BY_QUERY_FAILURE = "GET_FOLLOWINGS_BY_QUERY_FAILURE";

function requestGetFollowingsByQuery() {
  return {
    type: GET_FOLLOWINGS_BY_QUERY_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: ""
    },
  };
}

function receiveGetFollowingsByQuery(data, start, currentLength) {
  return {
    type: GET_FOLLOWINGS_BY_QUERY_SUCCESS,
    payload: {
      isFetching: false,
      offset: 0, // TODO: change to start + SEARCH_OFFSET
      hasMore: currentLength === SEARCH_LENGTH,
      share: data,
      errorMessage: ""
    },
  };
}

function errorGetFollowingsByQuery(message) {
  return {
    type: GET_FOLLOWINGS_BY_QUERY_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    },
  };
}

export function getFollowingsByQuery(api, query) {
  return async (dispatch, getState) => {
    dispatch(requestGetFollowingsByQuery());

    const url = generateUrl("getFollowingsSearch");
    try {
      const currentOffset = getState().users.offset;

      const { data } = await api
        .setMethod("GET")
        .setParams({
          query,
          start: currentOffset,
          length: SEARCH_LENGTH
        })
        .query(url);

      dispatch(receiveGetFollowingsByQuery(data, currentOffset, data.length));
    } catch(e) {
      console.error(e)
      dispatch(errorGetFollowingsByQuery("Error: GetFollowings"));
    }
  };
}