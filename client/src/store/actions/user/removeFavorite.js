export const REMOVE_FAVORITE_SUCCESS = "REMOVE_FAVORITE_SUCCESS";

function receiveFavorite(data) {
  return {
    type: REMOVE_FAVORITE_SUCCESS,
    payload: {
      isFetching: false,
      data,
      errorMessage: "",
    },
  };
}

export function removeFavorite() {
  return (dispatch, getState) => {
    let user = getState().user.data;
    user.isFavorite = false;

    dispatch(receiveFavorite(user));
  };
}
