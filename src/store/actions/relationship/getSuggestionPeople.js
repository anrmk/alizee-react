import { generateUrl } from "../../../helpers/functions";
import {
  FOLLOWERS_LENGTH,
  FOLLOWERS_OFFSET,
  POSTS_DEFAULT_OFFSET,
  FOLLOWERS_REFRESH_OFFSET,
  FOLLOWERS_REFRESH_LENGTH,
} from "../../../constants/feed";

export const GET_SUGGESTIONS_PEOPLE_REQUEST = "GET_SUGGESTIONS_PEOPLE_REQUEST";
export const GET_SUGGESTIONS_PEOPLE_SUCCESS = "GET_SUGGESTIONS_PEOPLE_SUCCESS";
export const GET_SUGGESTIONS_REFRESH_PEOPLE_SUCCESS =
  "GET_SUGGESTIONS_REFRESH_PEOPLE_SUCCESS";
export const GET_SUGGESTIONS_PEOPLE_FAILURE = "GET_SUGGESTIONS_PEOPLE_FAILURE";
export const RESET_SUGGESTIONS_PEOPLE = "RESET_SUGGESTIONS_PEOPLE";

function requestGetRecommended() {
  return {
    type: GET_SUGGESTIONS_PEOPLE_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetRecommended(data, start, length) {
  return {
    type: GET_SUGGESTIONS_PEOPLE_SUCCESS,
    payload: {
      isFetching: false,
      data,
      errorMessage: "",
      offset: start + FOLLOWERS_OFFSET,
      hasMore: length === FOLLOWERS_OFFSET,
    },
  };
}

function receiveGetRefreshRecommended(data, start) {
  return {
    type: GET_SUGGESTIONS_REFRESH_PEOPLE_SUCCESS,
    payload: {
      isFetching: false,
      data,
      errorMessage: "",
      offset: start + FOLLOWERS_REFRESH_OFFSET,
    },
  };
}

function errorGetRecommended(message) {
  return {
    type: GET_SUGGESTIONS_PEOPLE_FAILURE,
    payload: {
      isFetching: false,
      hasMore: false,
      errorMessage: message,
    },
  };
}

export function resetRecommended() {
  return (dispatch) =>
    dispatch({
      type: RESET_SUGGESTIONS_PEOPLE,
      payload: {
        isFetching: false,
        data: [],
        offset: POSTS_DEFAULT_OFFSET,
        hasMore: false,
        errorMessage: "",
      },
    });
}

export function getRefreshRecommended(api) {
  return async (dispatch, getState) => {
    dispatch(requestGetRecommended());

    try {
      const url = generateUrl("getRecommended");
      const currentOffset = getState().users.offset;

      const { data } = await api
        .setMethod("GET")
        .setParams({
          start: currentOffset,
          length: FOLLOWERS_REFRESH_LENGTH,
        })
        .query(url);

      if (data.length < FOLLOWERS_REFRESH_LENGTH) {
        dispatch(receiveGetRefreshRecommended([...data], POSTS_DEFAULT_OFFSET));
      } else {
        dispatch(receiveGetRefreshRecommended([...data], currentOffset));
      }
    } catch (e) {
      dispatch(errorGetRecommended("Error: something went wrong:", e));
    }
  };
}

export function getRecommended(api) {
  return async (dispatch, getState) => {
    dispatch(requestGetRecommended());

    try {
      const url = generateUrl("getRecommended");
      const currentOffset = getState().users.offset;

      const { data } = await api
        .setMethod("GET")
        .setParams({
          start: currentOffset,
          length: FOLLOWERS_LENGTH,
        })
        .query(url);

      dispatch(
        receiveGetRecommended(
          [...getState().users.data, ...data],
          currentOffset,
          data.length
        )
      );
    } catch (e) {
      dispatch(errorGetRecommended("Error: something went wrong:", e));
    }
  };
}
