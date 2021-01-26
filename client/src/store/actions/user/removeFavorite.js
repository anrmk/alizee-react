export const REMOVE_FAVORITE_SUCCESS = "REMOVE_FAVORITE_SUCCESS";

function receiveFavorite(user) {
  return {
    type: REMOVE_FAVORITE_SUCCESS,
    payload: {
      isFetching: true,
      user,
      errorMessage: "",
    },
  };
}

export function removeFavorite() {
  return (dispatch, getState) => {
    var user = getState().user;
    user.data.isFavorite = false;

    dispatch(receiveFavorite(user));
  };
}
