export const CHANGE_COVER_SUCCESS = "CHANGE_COVER_SUCCESS";

function receiveCover(data) {
  return {
    type: CHANGE_COVER_SUCCESS,
    payload: {
      isFetching: false,
      data,
      errorMessage: "",
    },
  };
}

export function changeCover(url) {
  return (dispatch, getState) => {
    const user = getState().user.data;
    user.coverUrl = url;

    dispatch(receiveCover(user));
  };
}
