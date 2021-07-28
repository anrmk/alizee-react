import { generateUrl, isEmptyObject } from "../../../helpers/functions";

export const FAVORITE_POST_REQUEST = "FAVORITE_POST_REQUEST";
export const FAVORITE_POST_SUCCESS = "FAVORITE_POST_SUCCESS";
export const FAVORITE_CURRENT_POST_SUCCESS = "FAVORITE_CURRENT_POST_SUCCESS";
export const FAVORITE_POST_FAILURE = "FAVORITE_POST_FAILURE";

function requestFavoritePost() {
  return {
    type: FAVORITE_POST_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveFavoritePost(posts) {
  return {
    type: FAVORITE_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: posts,
    },
  };
}

function receiveFavoriteCurrentPost(post) {
  return {
    type: FAVORITE_CURRENT_POST_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      currentPost: post,
    },
  };
}

function errorFavoritePost(message) {
  return {
    type: FAVORITE_POST_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function favoritePost(api, id) {
  return async (dispatch, getState) => {
    dispatch(requestFavoritePost());

    const url = generateUrl("favoritePost");
    try {
      const postsState = { ...getState().followingPosts };

      if (!postsState.data.length && isEmptyObject(postsState.currentPost)) {
        throw new Error("There is no local data");
      }

      let method = null;
      const posts = [...postsState.data];
      const currentPost = { ...postsState.currentPost };
      const isFollowingPosts = !!posts.length;
      const isCurrentPost = !isEmptyObject(currentPost);
      if (isFollowingPosts) {
        const postIndex = posts.findIndex((post) => post.id === id);

        if (postIndex !== -1) {
          const post = posts[postIndex];
          method = post.isFavorite ? "DELETE" : "POST";

          posts[postIndex].isFavorite = !posts[postIndex].isFavorite;
        }
      }
      if (isCurrentPost) {
        method = currentPost.isFavorite ? "DELETE" : "POST";

        currentPost.isFavorite = !currentPost.isFavorite;
      }
      await api.setMethod(method).setParams({ id }).query(url);

      isFollowingPosts && dispatch(receiveFavoritePost(posts));
      isCurrentPost && dispatch(receiveFavoriteCurrentPost(currentPost));
    } catch (e) {
      dispatch(errorFavoritePost("Error: something went wrong"));
    }
  };
}
