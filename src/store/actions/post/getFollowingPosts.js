import { generateUrl } from "../../../helpers/functions";
import { POSTS_OFFSET, POSTS_LENGTH } from "../../../constants/feed";

export const GET_FOLLOWING_POSTS_REQUEST = "GET_FOLLOWING_POSTS_REQUEST";
export const GET_FOLLOWING_POSTS_SUCCESS = "GET_FOLLOWING_POSTS_SUCCESS";
export const GET_FOLLOWING_POSTS_FAILURE = "GET_FOLLOWING_POSTS_FAILURE";
export const RESET_FOLLOWING_POSTS = "RESET_FOLLOWING_POSTS";
export const SET_SCROLL_POSITION = "SET_SCROLL_POSITION";

function requestGetFollowingPosts() {
  return {
    type: GET_FOLLOWING_POSTS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetFollowingPosts(data, length, start) {
  return {
    type: GET_FOLLOWING_POSTS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      offset: start + POSTS_OFFSET,
      hasMore: length === POSTS_LENGTH,
      data: data || [],
    },
  };
}

function errorGetFollowingPosts(message) {
  return {
    type: GET_FOLLOWING_POSTS_FAILURE,
    payload: {
      isFetching: false,
      hasMore: false,
      errorMessage: message,
    },
  };
}

export function setScrollPosition(position) {
  return {
    type: SET_SCROLL_POSITION,
    payload: {
      scrollPosition: position,
    },
  };
}

export function resetFollowingPosts() {
  return (dispatch) =>
    dispatch({
      type: RESET_FOLLOWING_POSTS,
      payload: {
        isFetching: false,
        offset: 0,
        hasMore: false,
        errorMessage: "",
        data: [],
      },
    });
}

export function getFollowingPosts(api) {
  return async (dispatch, getState) => {
    dispatch(requestGetFollowingPosts());

    const url = generateUrl("getFollowingPosts");
    const currentOffset = getState().followingPosts.offset;
    try {
      const { data } = await api
        .setMethod("GET")
        .setParams({
          start: currentOffset,
          length: POSTS_LENGTH,
        })
        .query(url);

      dispatch(
        receiveGetFollowingPosts(
          [...getState().followingPosts.data, ...data],
          data.length,
          currentOffset
        )
      );
    } catch (e) {
      dispatch(errorGetFollowingPosts("Error: something went wrong:", e));
    }
  };
}
