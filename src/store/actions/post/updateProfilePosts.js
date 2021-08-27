export const UPDATE_PROFILE_POSTS_SUCCESS = "UPDATE_PROFILE_POSTS_SUCCESS";

function receiveProfilePosts(data) {
  return {
    type: UPDATE_PROFILE_POSTS_SUCCESS,
    payload: {
      data: data || [],
    },
  };
}

export function updateProfilePosts(data) {
  return (dispatch, getState) => {
    const profilePosts = getState().profilePosts.data;

    dispatch(receiveProfilePosts([data, ...profilePosts]));
  };
}
