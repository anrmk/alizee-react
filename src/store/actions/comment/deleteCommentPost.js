import { generateUrl } from "../../../helpers/functions";

export const DELETE_COMMENT_REQUEST = "DELETE_COMMENT_REQUEST";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_FAILURE = "DELETE_COMMENT_FAILURE";

function requestDeleteComment() {
  return {
    type: DELETE_COMMENT_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveDeleteComment(posts) {
  return {
    type: DELETE_COMMENT_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: posts,
    },
  };
}

function errorDeleteComment(message) {
  return {
    type: DELETE_COMMENT_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function deleteComment(api, commentId) {
  return async (dispatch, getState) => {
    dispatch(requestDeleteComment());

    const url = generateUrl("deleteCommentPost");
    try {
      await api.setMethod("DELETE").setParams({ id: commentId }).query(url);

      const comments = getState().comment.data;

      if (comments.length) {
        const updatedComments = comments.filter(
          (comment) => comment.id !== commentId
        );
        dispatch(receiveDeleteComment(updatedComments));
      }
    } catch (e) {
      dispatch(errorDeleteComment("Error: something went wrong"));
    }
  };
}
