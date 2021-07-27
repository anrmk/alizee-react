import { generateUrl } from "../../../helpers/functions";
import { POSTS_OFFSET, POSTS_LENGTH } from "../../../constants/feed";

export const GET_FAVORITE_POSTS_REQUEST = "GET_FAVORITE_POSTS_REQUEST";
export const GET_FAVORITE_POSTS_SUCCESS = "GET_FAVORITE_POSTS_SUCCESS";
export const GET_FAVORITE_POSTS_FAILURE = "GET_FAVORITE_POSTS_FAILURE";

export const RESET_FAVORITE_POSTS = "RESET_FAVORITES_POSTS";

function requestGetFavoritePosts() {
  return {
    type: GET_FAVORITE_POSTS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetFavoritePosts(data, length, start) {
  return {
    type: GET_FAVORITE_POSTS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      offset: start + POSTS_OFFSET,
      hasMore: length === POSTS_OFFSET,
      data: data || [],
    },
  };
}

function errorGetFavoritePosts(message) {
  return {
    type: GET_FAVORITE_POSTS_FAILURE,
    payload: {
      isFetching: false,
      hasMore: false,
      errorMessage: message,
    },
  };
}

export function getFavoritePosts(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestGetFavoritePosts());

    const url = generateUrl("getFavoritePosts");
    const currentOffset = getState().profilePosts.offset;
    try {
      const { data } = await api
        .setMethod("GET")
        .setParams({
          start: currentOffset,
          length: POSTS_LENGTH,
        })
        .query(url);

      dispatch(
        receiveGetFavoritePosts(
          [...getState().profilePosts.data, ...data],
          data.length,
          currentOffset
        )
      );
    } catch (e) {
      dispatch(errorGetFavoritePosts("Error: something went wrong:", e));
    }
  };
}
