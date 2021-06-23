import { generateUrl, copyFlatObjectWithIgnore, isEmptyObject } from "../../../helpers/functions";
import { updatePostComments } from "../post/updatePostComments";

export const CREATE_COMMENT_POST_REQUEST = "CREATE_COMMENT_POST_REQUEST";
export const CREATE_COMMENT_POST_SUCCESS = "CREATE_COMMENT_POST_SUCCESS";
export const CREATE_COMMENT_POST_FAILURE = "CREATE_COMMENT_POST_FAILURE";

function requestCreateCommentPost() {
  return {
    type: CREATE_COMMENT_POST_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveCreateCommentPost(data) {
  return {
    type: CREATE_COMMENT_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data,
    },
  };
}

function errorCreateCommentPost(message) {
  return {
    type: CREATE_COMMENT_POST_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function createCommentPost(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestCreateCommentPost());

    if (!opts?.postId || !opts?.text) throw "postId or message don't exist";

    const url = generateUrl("createCommentPost");
    try {
      const { data } = await api
        .setData({
          text: opts.text,
          postId: opts.postId
        })
        .query(url);

      const followingPostsState = getState().followingPosts;

      if (followingPostsState.data.length > 0) {
        dispatch(updatePostComments(opts.postId, data));
      } 

      if (!isEmptyObject(followingPostsState.currentPost)) {
        const comments = [...getState().comment.data, data];
        dispatch(receiveCreateCommentPost(comments));
      }
    } catch (e) {
      dispatch(errorCreateCommentPost("Error: something went wrong"));
    }
  };
}
