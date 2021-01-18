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
      currentPost: post
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
      const postsState = getState().posts;

      if (!postsState.data.length && isEmptyObject(postsState.currentPost)) {
        throw "There is no local data";
      }

      if (postsState.data.length) {
        const posts = [...postsState.data];
        const postIndex = posts.findIndex((post) => post.id === id);

        if (postIndex === -1) {
          throw "Item not found!";
        }

        const post = posts[postIndex];

        await api.setMethod(post.isFavorite ? "DELETE" : "POST").setParams({ id }).query(url);

        posts[postIndex].isFavorite = !posts[postIndex].isFavorite;

        dispatch(receiveFavoritePost(posts));
      }

      if (!isEmptyObject(postsState.currentPost)) {
        const currentPost = { ...postsState.currentPost };

        await api.setMethod(currentPost.isFavorite ? "DELETE" : "POST").setParams({ id }).query(url);

        currentPost.isFavorite = !currentPost.isFavorite;

        dispatch(receiveFavoriteCurrentPost(currentPost));
      }
    } catch (e) {
      dispatch(errorFavoritePost("Error: something went wrong"));
    }
  };
}
