import { generateUrl, isEmptyObject } from "../../../helpers/functions";

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_CURRENT_POST_SUCCESS = "LIKE_CURRENT_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

function requestLikePost() {
  return {
    type: LIKE_POST_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: ""
    },
  };
}

function receiveLikePost(post) {
  return {
    type: LIKE_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: post
    },
  };
}

function receiveLikeCurrentPost(post) {
  return {
    type: LIKE_CURRENT_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      currentPost: post
    },
  };
}

function errorLikePost(message) {
  return {
    type: LIKE_POST_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    },
  };
}

export function likePost(api, id) {
  return async (dispatch, getState) => {
    dispatch(requestLikePost());

    const url = generateUrl("likePost");
    try {
      const postsState = getState().followingPosts;

      if (!postsState.data.length && isEmptyObject(postsState.currentPost)) {
        throw "There is no local data";
      }

      if (postsState.data.length) {
        const posts = [...postsState.data];
        const postIndex = posts.findIndex((post) => post.id === id);

        if (postIndex === -1) {
          throw "Item not found!";
        }

        const post = posts[postIndex];
        const method = post.iLike ? "DELETE" : "POST";

        await api.setMethod(method).setParams({ id }).query(url);

        posts[postIndex].likes += post.iLike ? -1 : 1;
        posts[postIndex].iLike = !post.iLike;

        dispatch(receiveLikePost(posts));
      }

      if (!isEmptyObject(postsState.currentPost)) {
        const currentPost = { ...postsState.currentPost };
        const method = currentPost.iLike ? "DELETE" : "POST";

        !(postsState.data.length > 0) && 
          await api.setMethod(method).setParams({ id }).query(url);

        currentPost.likes += currentPost.iLike ? -1 : 1;
        currentPost.iLike = !currentPost.iLike;

        dispatch(receiveLikeCurrentPost(currentPost));
      }
    } catch (e) {
      dispatch(errorLikePost("Error: something went wrong"));
    }
  };
}