import { generateUrl } from "../../../helpers/functions";

export const DELETE_COMMENT_REQUEST = "DELETE_COMMENT_REQUEST";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_FAILURE = "DELETE_COMMENT_FAILURE";

function requestDeleteComment() {
  return {
    type: DELETE_COMMENT_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: ""
    }
  };
}

function receiveDeleteComment(posts) {
  return {
    type: DELETE_COMMENT_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: posts
    }
  };
}

function errorDeleteComment(message) {
  return {
    type: DELETE_COMMENT_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    }
  };
}

export function deleteComment(api, commentId) {
  return async (dispatch, getState) => {
    dispatch(requestDeleteComment());

    const url = generateUrl("deleteCommentPost");
    try {
      const comments = getState().comment.data;

      if (!comments.length) {
        throw "There is no local data";
      }

      if (comments.length) {
        const commentIndex = comments.findIndex((post) => post.id === commentId);

        if (commentIndex === -1) {
          throw "Item not found!";
        }

        await api.setMethod("DELETE").setParams({ id: commentId }).query(url);

        dispatch(receiveDeleteComment(comments.filter((comments) => comments.id !== commentId)));
      }
      else {
        throw "Comments don't exist";
      }
    } catch (e) {
      dispatch(errorDeleteComment("Error: something went wrong"));
    }
  };
}
