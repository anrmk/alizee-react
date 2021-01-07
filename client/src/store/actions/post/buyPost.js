import { generateUrl } from "../../../helpers/functions";
import { fetchPost } from "./getPost";

export const BUY_POST_REQUEST = "BUY_POST_REQUEST";
export const BUY_POST_SUCCESS = "BUY_POST_SUCCESS";
export const BUY_POST_FAILURE = "BUY_POST_FAILURE";

function requestBuyPost() {
  return {
    type: BUY_POST_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveBuyPost(post) {
  return {
    type: BUY_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: post,
      currentPost: {}
    },
  };
}

function errorBuyPost(message) {
  return {
    type: BUY_POST_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function buyPost(api, id) {
  return async (dispatch, getState) => {
    dispatch(requestBuyPost());

    const postsState = getState().posts;
    const posts = [...postsState.data];
    const postIndex = posts.findIndex((post) => post.id === id);

    debugger

    try {
      if (postIndex === -1) {
        throw "Item not found!";
      }

      const post = posts[postIndex];
      const url = generateUrl("buyPost");

      await api.setParams({ id }).query(url);

      await dispatch(fetchPost(api, id));

      const currentPostState = getState().posts.currentPost;
      //currentPostState.isPurchased = currentPostState.amount > 0 && currentPost
      posts[postIndex] = currentPostState;

      dispatch(receiveBuyPost(posts));
    } catch (e) {
      dispatch(errorBuyPost("Error: something went wrong"));
    }
  };
}
