import { generateUrl, generateFileUrl, getOffset } from "../../../helpers/functions";
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

function receiveGetFavoritePosts(favorites, total, start, hasMore) {
  return {
    type: GET_FAVORITE_POSTS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      offset: getOffset(start, total, POSTS_OFFSET),
      hasMore,
      data: favorites || [],
      count: total,
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
    const currentOffset = getState().posts.offset;
    try {
      const { data } = await api
        .setMethod("GET")
        .setParams({
          start: currentOffset,
          length: POSTS_LENGTH,
        })
        .query(url);

      // Extend relative path to absolute (to remote server)
      data.data.forEach((item) => {
        const avatarUrl = item.user.avatarUrl;
        item.user = {
          ...item.user,
          avatarUrl: generateFileUrl(process.env.REACT_APP_DOMAIN, avatarUrl),
        };
        item.media.forEach((media) => {
          media.url = generateFileUrl(process.env.REACT_APP_DOMAIN, media.url);
          media.thumbnailUrl = generateFileUrl(process.env.REACT_APP_DOMAIN, media.thumbnailUrl);
        });
      });

      dispatch(
        receiveGetFavoritePosts([...getState().posts.data, ...data.data], data.recordsTotal, currentOffset, currentOffset + data.data.length < data.recordsTotal)
      );
    } catch (e) {
      dispatch(errorGetFavoritePosts("Error: something went wrong:", e));
    }
  };
}
