export const ADD_FAVORITE_SUCCESS = "ADD_FAVORITE_SUCCESS";

function receiveFavorite(data) {
  return {
    type: ADD_FAVORITE_SUCCESS,
    payload: {
      isFetching: false,
      data,
      errorMessage: "",
    },
  };
}

export function addFavorite() {
  return (dispatch, getState) => {
    let user = getState().user.data;
    user.isFavorite = true;

    dispatch(receiveFavorite(user));
  };
}