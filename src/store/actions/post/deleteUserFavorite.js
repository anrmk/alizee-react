import { isEmptyObject } from "../../../helpers/functions";

export const DELETE_POSTS_USER_FAVORITE_SUCCESS =
  "DELETE_POSTS_USER_FAVORITE_SUCCESS";
export const DELETE_POST_USER_FAVORITE_SUCCESS =
  "DELETE_POST_USER_FAVORITE_SUCCESS";

function receiveUserFavorite(data) {
  return {
    type: DELETE_POSTS_USER_FAVORITE_SUCCESS,
    payload: {
      isFetching: false,
      data,
      errorMessage: "",
    },
  };
}

function receivePostUserFavorite(data) {
  return {
    type: DELETE_POST_USER_FAVORITE_SUCCESS,
    payload: {
      isFetching: false,
      currentPost: data,
      errorMessage: "",
    },
  };
}

export function deletePostsUserFavorite(userName) {
  return (dispatch, getState) => {
    if (!isEmptyObject(getState().followingPosts.currentPost)) {
      const currentPostState = { ...getState().followingPosts.currentPost };
      currentPostState.user.isFavorite = false;

      receivePostUserFavorite(currentPostState);
    }

    const followingPosts = getState().followingPosts.data;
    if (followingPosts.length) {
      const list = [...followingPosts];
      const index = list.findIndex((item) => item?.user?.userName === userName);

      if (index === -1) {
        throw new Error();
      }

      list[index].user.isFavorite = false;
      dispatch(receiveUserFavorite(list));
    }
  };
}
