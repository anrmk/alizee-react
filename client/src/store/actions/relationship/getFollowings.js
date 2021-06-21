import { createSelector } from "reselect";

import { generateUrl } from "../../../helpers/functions";

export const GET_FOLLOWINGS_REQUEST = "GET_FOLLOWINGS_REQUEST";
export const GET_FOLLOWINGS_SUCCESS = "GET_FOLLOWINGS_SUCCESS";
export const GET_FOLLOWINGS_FAILURE = "GET_FOLLOWINGS_FAILURE";
export const FILTER_FOLLOWINGS = "FILTER_FOLLOWINGS";
export const RESET_FOLLOWINGS_FILTER = "RESET_FOLLOWINGS_FILTER";

function requestGetFollowings() {
  return {
    type: GET_FOLLOWINGS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetFollowings(data) {
  return {
    type: GET_FOLLOWINGS_SUCCESS,
    payload: {
      isFetching: false,
      data,
      errorMessage: "",
    },
  };
}

function errorGetFollowings(message) {
  return {
    type: GET_FOLLOWINGS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

function filterQueryFollowings(query) {
  return {
    type: FILTER_FOLLOWINGS,
    payload: {
      isFetching: false,
      errorMessage: "",
      query,
    },
  };
}

export function resetFollowingsFilter() {
  return {
    type: RESET_FOLLOWINGS_FILTER,
    payload: {
      isFetching: false,
      data: [],
      errorMessage: "",
      query: "",
    },
  };
}

export function getFollowings(api, userName) {
  return async (dispatch) => {
    dispatch(requestGetFollowings());

    const url = generateUrl("getFollowings");
    try {
      const { data } = await api.setMethod("GET").setParams({ userName }).query(url);

      dispatch(receiveGetFollowings(data));
    } catch {
      dispatch(errorGetFollowings("Error: GetFollowings"));
    }
  };
}

export function filterFollowings(query) {
  return async (dispatch) => {
    dispatch(filterQueryFollowings(query));
  };
}

// Sellectors
const querySelector = (state) => state.users.query;
const dataSelector = (state) => state.users.data;

export const getFilteredFollowings = createSelector([querySelector, dataSelector], (query, data) => {
  if (!query) return data;

  return data.filter((item) => item?.name?.toLowerCase().includes(query.toLowerCase()));
});
