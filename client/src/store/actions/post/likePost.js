import { generateUrl } from "../../../helpers/functions";

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

function requestLikePost() {
  return {
    type: LIKE_POST_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveLikePost(post) {
  return {
    type: LIKE_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: post,
    },
  };
}

function errorLikePost(message) {
  return {
    type: LIKE_POST_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function likePost(api, id) {
  return async (dispatch, getState) => {
    dispatch(requestLikePost());

    const postsState = getState().posts;
    const posts = [...postsState.data];
    const postIndex = posts.findIndex((post) => post.id === id);

    try {
      if (postIndex === -1) {
        throw "Item not found!";
      }

      const post = posts[postIndex];
      const url = generateUrl("likePost");

      await api
        .setMethod(post.iLike ? "DELETE" : "POST")
        .setParams({ id })
        .query(url);

      posts[postIndex].likes += post.iLike ? -1 : 1;
      posts[postIndex].iLike = !post.iLike;

      dispatch(receiveLikePost(posts));
    } catch (e) {
      dispatch(errorLikePost("Error: something went wrong"));
    }
  };
}
