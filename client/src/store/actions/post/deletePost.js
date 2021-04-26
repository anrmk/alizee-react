import { generateUrl, isEmptyObject } from "../../../helpers/functions";

export const DELETE_POST_REQUEST = "DELETE_POST_REQUEST";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";

function requestDeletePost() {
  return {
    type: DELETE_POST_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: ""
    }
  };
}

function receiveDeletePost(posts) {
  return {
    type: DELETE_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: posts
    }
  };
}

function receiveDeleteCurrentPost(currentPost) {
  return {
    type: DELETE_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      currentPost
    }
  };
}

function errorDeletePost(message) {
  return {
    type: DELETE_POST_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    }
  };
}

export function deletePost(api, postId) {
  return async (dispatch, getState) => {
    dispatch(requestDeletePost());

    const url = generateUrl("deletePost");
    try {
      const postsState = getState().posts;

      if (!postsState.data.length && isEmptyObject(postsState.currentPost)) {
        throw "There is no local data";
      }

      if (postsState.data.length) {
        const posts = [...postsState.data];
        const postIndex = posts.findIndex((post) => post.id === postId);

        if (postIndex === -1) {
          throw "Item not found!";
        }

        await api.setMethod("DELETE").setParams({ id: postId }).query(url);

        dispatch(receiveDeletePost(posts.filter((post) => post.id !== postId)));
      } else if (!isEmptyObject(postsState.currentPost)) {
        await api.setMethod("DELETE").setParams({ id: postId }).query(url);
        dispatch(receiveDeleteCurrentPost({}));
      }
    } catch (e) {
      dispatch(errorDeletePost("Error: something went wrong"));
    }
  };
}
