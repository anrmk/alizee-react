import { isEmptyObject } from "../../../helpers/functions";

export const UPDATE_POSTS_USER_BLOCK_SUCCESS =
  "UPDATE_POSTS_USER_BLOCK_SUCCESS";
export const UPDATE_POST_USER_BLOCK_SUCCESS = "UPDATE_POST_USER_BLOCK_SUCCESS";

function receivePostsUserBlock(data) {
  return {
    type: UPDATE_POSTS_USER_BLOCK_SUCCESS,
    payload: {
      isFetching: false,
      data,
      errorMessage: "",
    },
  };
}

function receivePostUserBlock(data) {
  return {
    type: UPDATE_POST_USER_BLOCK_SUCCESS,
    payload: {
      isFetching: false,
      currentPost: data,
      errorMessage: "",
    },
  };
}

function updatePostUserBlock(userName, isBlocked) {
  return (dispatch, getState) => {
    if (!isEmptyObject(getState().followingPosts.currentPost)) {
      const currentPostState = { ...getState().followingPosts.currentPost };
      currentPostState.user.isBlocked = isBlocked;

      receivePostUserBlock(currentPostState);
    }

    const followingPosts = getState().followingPosts.data;
    if (followingPosts.length) {
      const list = [...followingPosts];
      const index = list.findIndex((item) => item.user.userName === userName);

      if (index === -1) {
        throw new Error();
      }

      list[index].user.isBlocked = isBlocked;
      dispatch(receivePostsUserBlock(list));
    }
  };
}

export function addPostUserBlock(userName) {
  return updatePostUserBlock(userName, true);
}

export function removePostUserBlock(userName) {
  return updatePostUserBlock(userName, false);
}
