import { SEARCH_DEFAULT_OFFSET } from "../../../constants/search";

export const RESET_RELATIONSHIP = "RESET_RELATIONSHIP";

export function resetRelationship() {
  return (dispatch) =>
    dispatch({
      type: RESET_RELATIONSHIP,
      payload: {
        isFetching: false,
        offset: SEARCH_DEFAULT_OFFSET,
        hasMore: false,
        errorMessage: "",
        data: [],
        query: "",
      },
    });
}
