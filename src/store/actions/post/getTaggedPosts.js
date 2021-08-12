import { generateUrl } from "../../../helpers/functions";
import { POSTS_OFFSET, POSTS_LENGTH } from "../../../constants/feed";

export const GET_TAGGED_POSTS_REQUEST = "GET_TAGGED_POSTS_REQUEST";
export const GET_TAGGED_POSTS_SUCCESS = "GET_TAGGED_POSTS_SUCCESS";
export const GET_TAGGED_POSTS_FAILURE = "GET_TAGGED_POSTS_FAILURE";

function requestGetTaggedPosts() {
  return {
    type: GET_TAGGED_POSTS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetTaggedPosts(data, length, start) {
  return {
    type: GET_TAGGED_POSTS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      offset: start + POSTS_OFFSET,
      hasMore: length === POSTS_OFFSET,
      data: data || [],
    },
  };
}

function errorGetTaggedPosts(message) {
  return {
    type: GET_TAGGED_POSTS_FAILURE,
    payload: {
      isFetching: false,
      hasMore: false,
      errorMessage: message,
    },
  };
}

export function getTaggedPosts(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestGetTaggedPosts());

    const url = generateUrl("getTaggedPosts");
    const currentOffset = getState().profilePosts.offset;
    try {
      const { data } = await api
        .setMethod("GET")
        .setParams({
          userName: opts.userName,
          start: currentOffset,
          length: POSTS_LENGTH,
        })
        .query(url);

      dispatch(
        receiveGetTaggedPosts(
          [...getState().profilePosts.data, ...data],
          data.length,
          currentOffset
        )
      );
    } catch (e) {
      dispatch(errorGetTaggedPosts("Error: something went wrong:", e));
    }
  };
}
