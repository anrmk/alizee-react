import { createSelector } from "reselect";

import { generateUrl, getOffset } from "../../../helpers/functions";
import { POSTS_OFFSET } from "../../../constants/feed";

export const GET_POST_SUGGESTIONS_REQUEST = "GET_POST_SUGGESTIONS_REQUEST";
export const GET_POST_SUGGESTIONS_SUCCESS = "GET_POST_SUGGESTIONS_SUCCESS";
export const GET_POST_SUGGESTIONS_FAILURE = "GET_POST_SUGGESTIONS_FAILURE";

export const RESET_POSTS_SUGGESTIONS = "RESET_POSTS_SUGGESTIONS";

function requestGetPosts() {
  return {
    type: GET_POST_SUGGESTIONS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetPosts(data, total, start, hasMore) {
  return {
    type: GET_POST_SUGGESTIONS_SUCCESS,
    payload: {
      data: data || [],
      hasMore,
      isFetching: false,
      errorMessage: "",
      offset: getOffset(start, total, POSTS_OFFSET),
      count: total,
    },
  };
}

function errorGetPosts(message) {
  return {
    type: GET_POST_SUGGESTIONS_FAILURE,
    payload: {
      isFetching: false,
      hasMore: false,
      errorMessage: message,
    },
  };
}

export function resetPosts() {
  return (dispatch) =>
    dispatch({
      type: RESET_POSTS_SUGGESTIONS,
      payload: {
        isFetching: false,
        offset: 0,
        hasMore: false,
        errorMessage: "",
        data: [],
      },
    });
}

export function getPosts(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestGetPosts());

    try {
      const url = generateUrl("getPostsSuggestions");
      const currentOffset = getState().suggestionPosts.offset;

      const { data } = await api
        .setMethod("GET")
        .setParams({
          start: currentOffset,
          length: opts.length,
          type: opts.type,
        })
        .query(url);

      dispatch(
        receiveGetPosts([...getState().suggestionPosts.data, ...data.data], data.recordsTotal, currentOffset, !!data.data.length)
      );
    } catch (e) {
      dispatch(errorGetPosts("Error: something went wrong:", e));
    }
  };
}

// Selectors
const gridGallerySelector = (state) => state.suggestionPosts.data;

export const getGridGalleryPosts = createSelector([gridGallerySelector], (data) => {
  return data.reduce(
    (acc, curr) => [
      ...acc,
      {
        id: curr.id,
        caption: curr.description,
        amount: curr.amount,
        media: curr.media.length > 0 ? [curr.media[0]] : [],
      },
    ],
    []
  );
});
