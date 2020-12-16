import { generateUrl, copyFlatObjectWithIgnore } from "../../../helpers/functions";

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

function receiveCreateCommentPost(comments) {
  return {
    type: CREATE_COMMENT_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: comments,
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

    const url = generateUrl("createCommentPost");

    try {
      const { data } = await api
        .setData({
          text: opts.text,
          postId: opts.postId,
        })
        .query(url);

      const transformedComment = {
        ...copyFlatObjectWithIgnore(data, ["text"]),
        message: data.text,
      };

      const comments = [...getState().comment.data, transformedComment];
      console.log("COMMENTS", comments)

      dispatch(receiveCreateCommentPost(comments));
    } catch (e) {
      dispatch(errorCreateCommentPost("Error: something went wrong"));
    }
  };
}
