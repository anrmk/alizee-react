import { generateUrl, isEmptyObject } from "../../../helpers/functions";
import { fetchPost } from "./getPost";

export const BUY_POST_REQUEST = "BUY_POST_REQUEST";
export const BUY_POST_SUCCESS = "BUY_POST_SUCCESS";
export const BUY_CURRENT_POST_SUCCESS = "BUY_CURRENT_POST_SUCCESS";
export const BUY_POST_FAILURE = "BUY_POST_FAILURE";

function requestBuyPost() {
  return {
    type: BUY_POST_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: ""
    },
  };
}

function receiveBuyPost(posts) {
  return {
    type: BUY_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: posts || [],
      currentPost: {}
    },
  };
}

function receiveBuyCurrentPost() {
  return {
    type: BUY_CURRENT_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
    },
  };
}

function errorBuyPost(message) {
  return {
    type: BUY_POST_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    },
  };
}

export function buyPost(api, id) {
  return async (dispatch, getState) => {
    dispatch(requestBuyPost());

    const url = generateUrl("buyPost");
    try {
      const postsState = getState().posts;
      const currentPost = postsState.currentPost;

      if (!postsState.data.length && isEmptyObject(postsState.currentPost)) {
        throw "There is no local data";
      }

      await api.setParams({ id }).query(url);
      await dispatch(fetchPost(api, currentPost.id));

      if (postsState.data.length) {
        const posts = [...postsState.data];
        const postIndex = posts.findIndex((post) => post.id === id);

        if (postIndex === -1) {
          throw "Item not found!";
        }

        const currentPost = { ...getState().posts.currentPost };
        
        posts[postIndex] = currentPost;

        dispatch(receiveBuyPost(posts));
      }

      if (!isEmptyObject(postsState.currentPost)) {
        dispatch(receiveBuyCurrentPost());
      }
    } catch (e) {
      dispatch(errorBuyPost("Error: something went wrong"));
    }
  };
}
