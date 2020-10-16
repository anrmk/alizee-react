import { createSelector } from "reselect";

import { generateUrl } from "../../../helpers/functions";

export const GET_FOLLOWERS_REQUEST = "GET_FOLLOWERS_REQUEST";
export const GET_FOLLOWERS_SUCCESS = "GET_FOLLOWERS_SUCCESS";
export const GET_FOLLOWERS_FAILURE = "GET_FOLLOWERS_FAILURE";
export const FILTER_FOLLOWERS = "FILTER_FOLLOWERS";

function requestGetFollowers() {
  return {
    type: GET_FOLLOWERS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetFollowers(followersData) {
  return {
    type: GET_FOLLOWERS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      followers: followersData || [],
    },
  };
}

function errorGetFollowers(message) {
  return {
    type: GET_FOLLOWERS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

function _filterFollowers(query) {
  return {
    type: FILTER_FOLLOWERS,
    payload: {
      isFetching: false,
      errorMessage: "",
      query,
    },
  };
}

export function getFollowers(api) {
  return async (dispatch) => {
    dispatch(requestGetFollowers());

    const url = generateUrl("getFollowers");
    console.log("URL", url)
    try {
      const { status, data } = await api.setMethod("GET").query(url);

      if (status !== 200) {
        return dispatch(errorGetFollowers(data?.message));
      }

      dispatch(receiveGetFollowers(data));
    } catch {
      dispatch(errorGetFollowers("Error: GetFollowers"));
    }
  };
}

// SELECTOR FILTER
const querySelector = (state) => state.follower.query;
const dataSelector = (state) => state.follower.data;

export const getFilteredFollowers = createSelector(
  [querySelector, dataSelector],
  (query, data) => {
    return data.filter((item) =>
      item.followerName?.toLowerCase().includes(query.toLowerCase())
    );
  }
);

export function filterFollowers(query) {
  return async (dispatch) => {
    dispatch(_filterFollowers(query));
  };
}
