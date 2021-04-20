import { generateUrl } from "../../../helpers/functions";
import { refreshPosts } from "./getPosts";

export const GET_POST_REQUEST = "GET_POST_REQUEST";
export const GET_POST_SUCCESS = "GET_POST_SUCCESS";
export const GET_POST_FAILURE = "GET_POST_FAILURE";

function requestGetPost() {
  return {
    type: GET_POST_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetPost(post) {
  return {
    type: GET_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      currentPost: post,
    },
  };
}

function errorGetPost(message) {
  return {
    type: GET_POST_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getPost(api, id) {
  return async (dispatch) => {
    dispatch(requestGetPost());

    const url = generateUrl("getPost");
    try {
      const { data } = await api.setMethod("GET").setParams({ id }).query(url);

      dispatch(receiveGetPost(data));
      await dispatch(refreshPosts(data));
    } catch {
      dispatch(errorGetPost("Error: something went wrong"));
    }
  };
}
