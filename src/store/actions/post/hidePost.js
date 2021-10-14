import { generateUrl, isEmptyObject } from "../../../helpers/functions";

export const HIDE_POST_REQUEST = "HIDE_POST_REQUEST";
export const HIDE_POST_SUCCESS = "HIDE_POST_SUCCESS";
export const HIDE_POST_FAILURE = "HIDE_POST_FAILURE";

function requestHidePost() {
  return {
    type: HIDE_POST_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveHidePost(posts) {
  return {
    type: HIDE_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: posts,
    },
  };
}

function receiveHideCurrentPost(currentPost) {
  return {
    type: HIDE_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      currentPost,
    },
  };
}

function errorHidePost(message) {
  return {
    type: HIDE_POST_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function hidePost(api, postId) {
  return async (dispatch, getState) => {
    dispatch(requestHidePost());

    const url = generateUrl("hidePost");
    try {
      const postsState = getState().followingPosts;

      if (postsState.data.length) {
        const posts = [...postsState.data];
        const postIndex = posts.findIndex((post) => post.id === postId);

        if (postIndex !== -1) {
          await api.setMethod("POST").setParams({ id: postId }).query(url);
          const filteredPosts = posts.filter((post) => post.id !== postId);
          dispatch(receiveHidePost(filteredPosts));
        }
      } else if (!isEmptyObject(postsState.currentPost)) {
        await api.setMethod("POST").setParams({ id: postId }).query(url);
        dispatch(receiveHideCurrentPost({}));
      }
    } catch (e) {
      dispatch(errorHidePost("Error: something went wrong"));
    }
  };
}
