import { generateUrl } from "../../../helpers/functions";
import {
  COMMENTS_POST_LENGTH,
  COMMENTS_POST_OFFSET,
  POSTS_DEFAULT_OFFSET,
} from "../../../constants/feed";

export const GET_COMMENTS_POST_REQUEST = "GET_COMMENTS_POST_REQUEST";
export const GET_COMMENTS_POST_SUCCESS = "GET_COMMENTS_POST_SUCCESS";
export const GET_COMMENTS_POST_FAILURE = "GET_COMMENTS_POST_FAILURE";
export const RESET_COMMENTS_POST_SUCCESS = "RESET_COMMENTS_POST_SUCCESS";

function requestCommentsPost() {
  return {
    type: GET_COMMENTS_POST_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveCommentsPost(data, currentLength, start) {
  return {
    type: GET_COMMENTS_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      offset: start + COMMENTS_POST_OFFSET, // getOffset(start, total, COMMENTS_POST_OFFSET),
      hasMore: currentLength === COMMENTS_POST_LENGTH,
      data: data || [],
    },
  };
}

function errorCommentsPost(message) {
  return {
    type: GET_COMMENTS_POST_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

function successResetComments() {
  return {
    type: RESET_COMMENTS_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      hasMore: false,
      offset: POSTS_DEFAULT_OFFSET,
      count: 0,
      data: [],
    },
  };
}

export function getCommentsPost(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestCommentsPost());

    try {
      const url = generateUrl("getCommentsPost");
      const currentOffset = getState().comment.offset;

      const { data } = await api
        .setMethod("GET")
        .setParams({
          postId: opts.postId,
          start: currentOffset,
          length: COMMENTS_POST_LENGTH,
        })
        .query(url);

      dispatch(
        receiveCommentsPost(
          [...data.reverse(), ...getState().comment.data],
          data.length,
          currentOffset
        )
      );
    } catch (e) {
      dispatch(errorCommentsPost("Error: something went wrong"));
    }
  };
}

export function resetCommentsPost() {
  return (dispatch) => dispatch(successResetComments());
}
