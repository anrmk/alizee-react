export const UPDATE_POST_COMMENTS_REQUEST = "UPDATE_POST_COMMENTS_REQUEST";
export const UPDATE_POST_COMMENTS_SUCCESS = "UPDATE_POST_COMMENTS_SUCCESS";
export const UPDATE_POST_COMMENTS_FAILURE = "UPDATE_POST_COMMENTS_FAILURE";

function requestUpdatePostComments() {
  return {
    type: UPDATE_POST_COMMENTS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: ""
    },
  };
}

function receiveUpdatePostComments(posts) {
  return {
    type: UPDATE_POST_COMMENTS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: posts
    },
  };
}

function errorUpdatePostComments(message) {
  return {
    type: UPDATE_POST_COMMENTS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    },
  };
}

export function updatePostComments(postId, comment) {
  return async (dispatch, getState) => {
    dispatch(requestUpdatePostComments());

    try {
      const postsState = getState().followingPosts;

      if (!postsState.data.length) {
        throw "There is no local data";
      }

      const posts = [...postsState.data];
      const postIndex = posts.findIndex((post) => post.id === postId);

      if (postIndex === -1) {
        throw "Item not found!";
      }

      posts[postIndex].comments = [...posts[postIndex].comments, comment];

      dispatch(receiveUpdatePostComments(posts));
    } catch (e) {
      dispatch(errorUpdatePostComments("Error: something went wrong"));
    }
  };
}
