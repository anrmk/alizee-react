export const RESET_RELATIONSHIP = "RESET_RELATIONSHIP";

export function resetRelationship() {
  return (dispatch) =>
    dispatch({
      type: RESET_RELATIONSHIP,
      payload: {
        isFetching: false,
        data: [],
        offset: 0,
        hasMore: false,
        errorMessage: "",
      },
    });
}
