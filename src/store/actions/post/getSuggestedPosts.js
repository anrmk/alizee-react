import { createSelector } from "reselect";

import { generateUrl } from "../../../helpers/functions";
import { POSTS_OFFSET, POSTS_LENGTH } from "../../../constants/feed";

export const GET_SUGGESTED_POSTS_REQUEST = "GET_SUGGESTED_POSTS_REQUEST";
export const GET_SUGGESTED_POSTS_SUCCESS = "GET_SUGGESTED_POSTS_SUCCESS";
export const GET_SUGGESTED_POSTS_FAILURE = "GET_SUGGESTED_POSTS_FAILURE";

export const RESET_SUGGESTED_POSTS = "RESET_SUGGESTED_POSTS";

function requestGetPosts() {
  return {
    type: GET_SUGGESTED_POSTS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetPosts(data, length, start) {
  return {
    type: GET_SUGGESTED_POSTS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      offset: start + POSTS_OFFSET,
      hasMore: length === POSTS_LENGTH,
      data: data || [],
    },
  };
}

function errorGetPosts(message) {
  return {
    type: GET_SUGGESTED_POSTS_FAILURE,
    payload: {
      isFetching: false,
      hasMore: false,
      errorMessage: message,
    },
  };
}

export function resetSuggestedPosts() {
  return (dispatch) =>
    dispatch({
      type: RESET_SUGGESTED_POSTS,
      payload: {
        isFetching: false,
        offset: 0,
        hasMore: false,
        errorMessage: "",
        data: [],
      },
    });
}

export function getSuggestedPosts(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestGetPosts());

    try {
      const url = generateUrl("getSuggestionPosts");
      const currentOffset = getState().suggestedPosts.offset;

      const { data } = await api
        .setMethod("GET")
        .setParams({
          start: currentOffset,
          length: POSTS_LENGTH,
          type: opts.type,
        })
        .query(url);

      dispatch(
        receiveGetPosts(
          [...getState().suggestedPosts.data, ...data],
          data.length,
          currentOffset
        )
      );
    } catch (e) {
      dispatch(errorGetPosts("Error: something went wrong:", e));
    }
  };
}

// Selectors
const gridGallerySelector = (state) => state.suggestedPosts.data;

export const getGridGalleryPosts = createSelector(
  [gridGallerySelector],
  (data) =>
    data.reduce(
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
    )
);
