import { createSelector } from "reselect";
import { FOLLOWERS_LENGTH, FOLLOWERS_OFFSET } from "../../../constants/feed";

import { generateUrl } from "../../../helpers/functions";
import { resetRelationship } from "./resetRelationship";

export const GET_FOLLOWINGS_REQUEST = "GET_FOLLOWINGS_REQUEST";
export const GET_FOLLOWINGS_SUCCESS = "GET_FOLLOWINGS_SUCCESS";
export const GET_FOLLOWINGS_FAILURE = "GET_FOLLOWINGS_FAILURE";
export const FILTER_FOLLOWINGS = "FILTER_FOLLOWINGS";
export const RESET_FOLLOWINGS_USERS = "RESET_FOLLOWINGS_USERS";
export const RESET_FOLLOWINGS_FILTER = "RESET_FOLLOWINGS_FILTER";
export const GET_FOLLOWINGS_SHARE_SUCCESS = "GET_FOLLOWINGS_SHARE_SUCCESS";

function requestGetFollowings() {
  return {
    type: GET_FOLLOWINGS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetFollowings(data, query, start, length) {
  return {
    type: GET_FOLLOWINGS_SUCCESS,
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

function errorGetFollowings(message) {
  return {
    type: GET_FOLLOWINGS_FAILURE,
    payload: {
      isFetching: false,
      hasMore: false,
      errorMessage: message,
    },
  };
}

export function filterFollowingsByQuery(query) {
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
      errorMessage: "",
      share: null,
      query: "",
    },
  };
}

export function resetFollowingsUsers() {
  return {
    type: RESET_FOLLOWINGS_USERS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: [],
      query: "",
    },
  };
}

export function receiveGetFollowingsShare(data) {
  return {
    type: GET_FOLLOWINGS_SHARE_SUCCESS,
    payload: {
      isFetching: false,
      share: data,
      errorMessage: "",
    },
  };
}

export function getFollowings(api, userName, query) {
  return async (dispatch, getState) => {
    dispatch(requestGetFollowings());

    const url = generateUrl("getFollowings");
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
        receiveGetFollowings(
          [...getState().users.data, ...data],
          query || "",
          currentOffset,
          data.length
        )
      );
    } catch {
      dispatch(errorGetFollowings("Error: GetFollowings"));
    }
  };
}

export function getShareFollowings(api, userName) {
  return async (dispatch) => {
    dispatch(requestGetFollowings());

    const url = generateUrl("getFollowings");
    try {
      const { data } = await api
        .setMethod("GET")
        .setParams({ userName })
        .query(url);

      dispatch(receiveGetFollowingsShare(data));
    } catch {
      dispatch(errorGetFollowings("Error: GetFollowings"));
    }
  };
}

// Sellectors
const querySelector = (state) => state.users.query;
const shareSelector = (state) => state.users.share;
const dataSelector = (state) => state.users.data;

export const getFilteredShare = createSelector(
  [querySelector, shareSelector],
  (query, data) => {
    if (!query) return data;

    return data.filter((item) =>
      item?.name?.toLowerCase().includes(query.toLowerCase())
    );
  }
);

export const getFilteredUsers = createSelector(
  [querySelector, dataSelector],
  (query, data) => {
    if (!query) return data;

    return data.filter((item) =>
      item?.name?.toLowerCase().includes(query.toLowerCase())
    );
  }
);
