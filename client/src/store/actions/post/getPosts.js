import { createSelector } from "reselect";

import { generateUrl, getOffset } from "../../../helpers/functions";
import { POSTS_OFFSET, POSTS_LENGTH } from "../../../constants/feed";

export const GET_POSTS_REQUEST = "GET_POSTS_REQUEST";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAILURE = "GET_POSTS_FAILURE";
export const REFRESH_POSTS = "REFRESH_POSTS";
export const RESET_POSTS = "RESET_POSTS";

function requestGetPosts() {
  return {
    type: GET_POSTS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetPosts(posts, total, start, hasMore) {
  return {
    type: GET_POSTS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      offset: getOffset(start, total, POSTS_OFFSET),
      hasMore,
      data: posts || [],
      count: total,
    },
  };
}

function errorGetPosts(message) {
  return {
    type: GET_POSTS_FAILURE,
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
      type: RESET_POSTS,
      payload: {
        isFetching: false,
        offset: 0,
        hasMore: false,
        errorMessage: "",
        data: [],
      },
    });
}

export function refreshPosts(postData) {
  return (dispatch, getState) => {
    const posts = [...getState().posts.data];
    const postIndex = posts.findIndex((post) => post.id === postData.id);
    if (postIndex === -1) return;

    posts[postIndex] = postData;
    dispatch({
      type: REFRESH_POSTS,
      payload: {
        isFetching: false,
        errorMessage: "",
        data: posts,
      },
    });
  };
}

export function getPosts(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestGetPosts());

    const url = generateUrl("getPosts");
    const currentOffset = getState().posts.offset;
    try {
      const { data } = await api
        .setMethod("GET")
        .setParams({
          userName: opts.userName,
          start: currentOffset,
          length: POSTS_LENGTH,
          tagged: opts.tagged || false,
        })
        .query(url);

      dispatch(
        receiveGetPosts(
          [...getState().posts.data, ...data.data],
          data.recordsTotal,
          currentOffset,
          currentOffset + data.data.length < data.recordsTotal
        )
      );
    } catch (e) {
      dispatch(errorGetPosts("Error: something went wrong:", e));
    }
  };
}

// Selectors
const gridGallerySelector = (state) => state.posts.data;

export const getGridGalleryPosts = createSelector([gridGallerySelector], (data) => {
  return data.reduce(
    (acc, curr) => [
      ...acc,
      {
        id: curr.id,
        caption: curr.description,
        amount: curr.amount,
        media: curr.media.length > 0 ? [...curr.media] : [],
      },
    ],
    []
  );
});
