export const CHANGE_AVATAR_SUCCESS = "CHANGE_AVATAR_SUCCESS";

function receiveAvatar(data) {
  return {
    type: CHANGE_AVATAR_SUCCESS,
    payload: {
      isFetching: false,
      data,
      errorMessage: "",
    },
  };
}

export function changeAvatar(url) {
  return (dispatch, getState) => {
    const user = getState().user.data;
    user.avatarUrl = url;

    dispatch(receiveAvatar(user));
  };
}
