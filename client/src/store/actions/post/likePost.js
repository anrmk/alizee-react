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

    const url = generateUrl("likePost");
    try {
      const { data } = await api.setParams({ id }).query(url);

      dispatch(receiveLikePost(data));
    } catch (e) {
      console.log(e);
      dispatch(errorLikePost("Error: something went wrong"));
    }
  };
}
