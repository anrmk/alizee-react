export const UPDATE_MOOD_SUCCESS = "UPDATE_MOOD_SUCCESS";

function receiveUserMood(user) {
  return {
    type: UPDATE_MOOD_SUCCESS,
    payload: {
      isFetching: true,
      errorMessage: "",
      data: user
    },
  };
}

export function updateMood(mood) {
  return (dispatch, getState) => {
    const user = getState().user.data;
    user.mood = mood;

    dispatch(receiveUserMood(user));
  };
}
