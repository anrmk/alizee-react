export const UPDATE_CURRENT_ROOM = "UPDATE_CURRENT_ROOM";

export function updateCurrentRoom(current) {
  return (dispatch) =>
    dispatch({
      type: UPDATE_CURRENT_ROOM,
      payload: {
        current,
        isFetching: false,
        errorMessage: "",
      },
    });
}
