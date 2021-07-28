import { createSelector } from "reselect";

import { generateUrl } from "../../../helpers/functions";
import { POSTS_OFFSET, POSTS_LENGTH } from "../../../constants/feed";

export const GET_POSTS_REQUEST = "GET_POSTS_REQUEST";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAILURE = "GET_POSTS_FAILURE";
export const RESET_POSTS = "RESET_POSTS";
export const REFRESH_POST = "REFRESH_POST";

function requestGetPosts() {
  return {
    type: GET_POSTS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetPosts(data, length, start) {
  return {
    type: GET_POSTS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      offset: start + POSTS_OFFSET,
      hasMore: length === POSTS_OFFSET,
      data: data || [],
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

export function refreshPost(postData) {
  return (dispatch, getState) => {
    const posts = [...getState().followingPosts.data];
    const postIndex = posts.findIndex((post) => post.id === postData.id);
    if (postIndex === -1) return;

    posts[postIndex] = postData;
    dispatch({
      type: REFRESH_POST,
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
    const currentOffset = getState().profilePosts.offset;
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
          [...getState().profilePosts.data, ...data],
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
const gridGallerySelector = (state) => state.profilePosts.data;

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
          media: curr.media.length > 0 ? [...curr.media] : [],
        },
      ],
      []
    )
);
