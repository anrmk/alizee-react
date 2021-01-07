import { createSelector } from "reselect";

import { generateUrl, generateFileUrl } from "../../../helpers/functions";

export const GET_FOLLOWINGS_REQUEST = "GET_FOLLOWINGS_REQUEST";
export const GET_FOLLOWINGS_SUCCESS = "GET_FOLLOWINGS_SUCCESS";
export const GET_FOLLOWINGS_FAILURE = "GET_FOLLOWINGS_FAILURE";
export const FILTER_FOLLOWINGS = "FILTER_FOLLOWINGS";

function requestGetFollowings() {
  return {
    type: GET_FOLLOWINGS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: ""
    },
  };
}

function receiveGetFollowings(followingsData) {
  return {
    type: GET_FOLLOWINGS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      followings: followingsData || [],
    },
  };
}

function errorGetFollowings(message) {
  return {
    type: GET_FOLLOWINGS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
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

export function getFollowings(api, userId) {
  return async (dispatch) => {
    dispatch(requestGetFollowings());

    const url = generateUrl("getFollowings");
    try {
      const { data } = await api
        .setMethod("GET")
        .setParams({ userId })
        .query(url);

        data.map((item) => {
          item.avatarUrl = generateFileUrl(process.env.REACT_APP_DOMAIN, item.avatarUrl);
        });
      
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
const querySelector = (state) => state.relationship.query;
const dataSelector = (state) => state.relationship.followings;

export const getFilteredFollowings = createSelector(
  [querySelector, dataSelector],
  (query, data) => {
    if (!query) return data;

    return data.filter((item) =>
      item?.fullName?.toLowerCase().includes(query.toLowerCase())
    );
  }
);
