import { generateUrl } from "../../../helpers/functions";

import { SEARCH_DEFAULT_OFFSET, SEARCH_OFFSET, SEARCH_TAG_TYPE, SEARCH_LENGTH } from "../../../constants/search";

export const GET_USERS_BY_QUERY_REQUEST = "GET_USERS_BY_QUERY_REQUEST";
export const GET_USERS_BY_QUERY_SUCCESS = "GET_USERS_BY_QUERY_SUCCESS";
export const GET_USERS_BY_QUERY_FAILURE = "GET_USERS_BY_QUERY_FAILURE";
export const RESET_SEARCH = "RESET_SEARCH";
export const RESET_HAS_MORE = "RESET_HAS_MORE";

function requestGetUsersByQuery() {
  return {
    type: GET_USERS_BY_QUERY_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetUsersByQuery(data, type, start, currentLength, query, tags) {
  return {
    type: GET_USERS_BY_QUERY_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      type,
      offset: start + SEARCH_OFFSET,
      hasMore: currentLength === SEARCH_LENGTH,
      data: data || [],
      tags,
      query,
    },
  };
}

function errorGetUsersByQuery(message) {
  return {
    type: GET_USERS_BY_QUERY_FAILURE,
    payload: {
      isFetching: false,
      hasMore: false,
      errorMessage: message,
    },
  };
}

export function resetHasMore() {
  return (dispatch) =>
    dispatch({
      type: RESET_HAS_MORE,
      payload: {
        isFetching: false,
        hasMore: false,
        errorMessage: "",
      },
    });
}

export function resetSearch() {
  return (dispatch) =>
    dispatch({
      type: RESET_SEARCH,
      payload: {
        isFetching: false,
        offset: SEARCH_DEFAULT_OFFSET,
        hasMore: false,
        errorMessage: "",
        data: [],
        tags: [],
        type: null,
        tags: [],
      },
    });
}

export function getUsersByQuery(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestGetUsersByQuery());

    const url = generateUrl("getSearchData");
    if (getState().search.query !== opts.query) {
      dispatch(resetSearch());
    }

    const currentOffset = getState().search.offset;
    try {
      const { data } = await api
        .setMethod("GET")
        .setParams({
          type: opts.type,
          query: opts.query,
          start: currentOffset,
          length: SEARCH_LENGTH,
        })
        .query(url);
      const tags = data.tags;
      const users = data.data;

      dispatch(receiveGetUsersByQuery([...getState().search.data, ...users], opts.type, currentOffset, users.length, opts.query, tags));
    } catch (e) {
      dispatch(errorGetUsersByQuery("Error: something went wrong:"));
    }
  };
}
