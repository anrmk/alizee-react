import { generateUrl, generateFileUrl } from "../../../helpers/functions";

import { SEARCH_DEFAULT_OFFSET, SEARCH_OFFSET, SEARCH_USER_TYPE } from "../../../constants/search";

export const GET_USERS_BY_QUERY_REQUEST = "GET_USERS_BY_QUERY_REQUEST";
export const GET_USERS_BY_QUERY_SUCCESS = "GET_USERS_BY_QUERY_SUCCESS";
export const GET_USERS_BY_QUERY_FAILURE = "GET_USERS_BY_QUERY_FAILURE";

export const RESET_SEARCH_USERS_BY_QUERY = "RESET_SEARCH_USERS_BY_QUERY";

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

function receiveGetUsersByQuery(data, type, start, hasMore, query) {
  return {
    type: GET_USERS_BY_QUERY_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      type,
      offset: start + SEARCH_OFFSET,
      hasMore,
      data: data || [],
      query
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
      type: RESET_SEARCH_USERS_BY_QUERY,
      payload: {
        isFetching: false,
        offset: SEARCH_DEFAULT_OFFSET,
        hasMore: false,
        errorMessage: "",
        data: [],
        type: null
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
          type: SEARCH_USER_TYPE,
          query: opts.query,
          start: currentOffset,
          length: SEARCH_OFFSET,
        })
        .query(url);

        if (data.length) {
          data.forEach((item, index) => {
            data[index] = {
              ...item,
              avatarUrl: generateFileUrl(process.env.REACT_APP_DOMAIN, item.avatarUrl),
            };
          });
    
          dispatch(receiveGetUsersByQuery(
            [...getState().search.data, ...data],
            SEARCH_USER_TYPE,
            currentOffset,
            true,
            opts.query
          ));
        } else {
          dispatch(resetHasMore());
        }
      
    } catch (e) {
      dispatch(errorGetUsersByQuery("Error: something went wrong:"));
    }
  };
}
