export const RESET_CURRENT_ROOM = "RESET_CURRENT_ROOM";

export function resetCurrentRoom() {
  return dispatch => dispatch({
    type: RESET_CURRENT_ROOM,
    payload: {
      isFetching: false,
      errorMessage: "",
      current: {}
    },
  })
}
