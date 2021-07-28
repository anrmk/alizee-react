import { isEmptyObject } from "../../../helpers/functions";

export const ADD_POSTS_USER_FAVORITE_SUCCESS =
  "ADD_POSTS_USER_FAVORITE_SUCCESS";
export const ADD_POST_USER_FAVORITE_SUCCESS = "ADD_POST_USER_FAVORITE_SUCCESS";

function receivePostsUserFavorite(data) {
  return {
    type: ADD_POSTS_USER_FAVORITE_SUCCESS,
    payload: {
      isFetching: false,
      data,
      errorMessage: "",
    },
  };
}

function receivePostUserFavorite(data) {
  return {
    type: ADD_POST_USER_FAVORITE_SUCCESS,
    payload: {
      isFetching: false,
      currentPost: data,
      errorMessage: "",
    },
  };
}

export function addPostsUserFavorite(userName) {
  return (dispatch, getState) => {
    if (!isEmptyObject(getState().followingPosts.currentPost)) {
      const currentPostState = { ...getState().followingPosts.currentPost };
      currentPostState.user.isFavorite = true;

      receivePostUserFavorite(currentPostState);
    }

    const followingPosts = getState().followingPosts.data;
    if (followingPosts.length) {
      const list = [...followingPosts];
      const index = list.findIndex((item) => item.user.userName === userName);

      if (index === -1) {
        throw new Error();
      }

      list[index].user.isFavorite = true;
      dispatch(receivePostsUserFavorite(list));
    }
  };
}
