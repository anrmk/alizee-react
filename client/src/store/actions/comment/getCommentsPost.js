import { generateUrl, getOffset, copyFlatObjectWithIgnore } from "../../../helpers/functions";
import { COMMENTS_POST_OFFSET, POSTS_DEFAULT_OFFSET } from "../../../constants/feed";

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

function receiveCommentsPost(comments, total, start, hasMore) {
  return {
    type: GET_COMMENTS_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      hasMore,
      offset: getOffset(start, total, COMMENTS_POST_OFFSET),
      count: total,
      data: comments || []
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
      data: []
    },
  };
}

export function getCommentsPost(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestCommentsPost());

    try {
      const url = generateUrl("getCommentsPost");
      const currentOffset = getState().comment.offset;

      console.log("GEt comments post", opts)

      const { data } = await api
        .setMethod("GET")
        .setParams({
          // userId: opts.userId,
          postId: opts.postId,
          start: currentOffset,
          length: opts.length,
          type: opts.type,
        })
        .query(url);
      
      const transformedComments = [];
      data.data.forEach(item => {
        transformedComments.push({
          ...copyFlatObjectWithIgnore(item, ["text"]),
          message: item.text
        })
      })

      dispatch(receiveCommentsPost(
          [...transformedComments.reverse(), ...getState().comment.data], 
          data.recordsTotal, 
          currentOffset, 
          !!transformedComments.length
        ));
    } catch (e) {
      dispatch(errorCommentsPost("Error: something went wrong"));
    }
  };
}

export function resetCommentsPost() {
  return dispatch => dispatch(successResetComments());
}
