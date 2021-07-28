import { generateUrl } from "../../../helpers/functions";

import {
  SEARCH_DEFAULT_OFFSET,
  SEARCH_OFFSET,
  SEARCH_LENGTH,
} from "../../../constants/search";

export const GET_DATA_BY_QUERY_REQUEST = "GET_DATA_BY_QUERY_REQUEST";
export const GET_DATA_BY_QUERY_SUCCESS = "GET_DATA_BY_QUERY_SUCCESS";
export const GET_DATA_BY_QUERY_FAILURE = "GET_DATA_BY_QUERY_FAILURE";
export const RESET_SEARCH = "RESET_SEARCH";
export const RESET_HAS_MORE = "RESET_HAS_MORE";

function requestGetDataByQuery() {
  return {
    type: GET_DATA_BY_QUERY_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetDataByQuery(data, type, start, currentLength, query, tags) {
  return {
    type: GET_DATA_BY_QUERY_SUCCESS,
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

function errorGetDataByQuery(message) {
  return {
    type: GET_DATA_BY_QUERY_FAILURE,
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
        query: "",
      },
    });
}

export function getDataByQuery(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestGetDataByQuery());

    const url = generateUrl("getSearchData");
    try {
      if (getState().search.query !== opts.query) {
        dispatch(resetSearch());
      }

      const currentOffset = getState().search.offset;

      const { data } = await api
        .setMethod("GET")
        .setParams({
          type: opts.type,
          query: opts.query,
          start: currentOffset,
          length: SEARCH_LENGTH,
        })
        .query(url);
      const { tags } = data;
      const users = data.data;

      await dispatch(
        receiveGetDataByQuery(
          [...getState().search.data, ...users],
          opts.type,
          currentOffset,
          users.length,
          opts.query,
          tags
        )
      );
    } catch (e) {
      dispatch(errorGetDataByQuery("Error: something went wrong:"));
    }
  };
}
