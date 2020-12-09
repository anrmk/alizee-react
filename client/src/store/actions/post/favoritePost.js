import { generateUrl } from "../../../helpers/functions";

export const FAVORITE_POST_REQUEST = "FAVORITE_POST_REQUEST";
export const FAVORITE_POST_SUCCESS = "FAVORITE_POST_SUCCESS";
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

    const postsState = getState().posts;
    const posts = [...postsState.data];
    const postIndex = posts.findIndex((post) => post.id === id);
    
    try {
      if (postIndex === -1) {
        throw "Item not found!";
      }

      const post = posts[postIndex];
      const url = generateUrl("favoritePost");
      
      await api
        .setMethod(post.isFavorite ? "DELETE" : "POST")
        .setParams({ id })
        .query(url);

      posts[postIndex].isFavorite = !post.isFavorite;

      dispatch(receiveFavoritePost(posts));
    } catch (e) {
      dispatch(errorFavoritePost("Error: something went wrong"));
    }
  };
}
