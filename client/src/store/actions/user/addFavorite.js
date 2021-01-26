export const ADD_FAVORITE_SUCCESS = "ADD_FAVORITE_SUCCESS";

function receiveFavorite(user) {
  return {
    type: ADD_FAVORITE_SUCCESS,
    payload: {
      isFetching: true,
      user,
      errorMessage: "",
    },
  };
}

export function addFavorite() {
  return (dispatch, getState) => {
    var user = getState().user;
    user.data.isFavorite = true;

    dispatch(receiveFavorite(user));
  };
}