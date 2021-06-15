import {
  GET_USERS_BY_QUERY_REQUEST,
  GET_USERS_BY_QUERY_SUCCESS,
  GET_USERS_BY_QUERY_FAILURE,
  RESET_SEARCH,
  RESET_HAS_MORE,
} from "../actions/search";

import { SEARCH_DEFAULT_OFFSET } from "../../constants/search";

export default function search(
  state = {
    isFetching: false,
    hasMore: false,
    data: [],
    tags: [],
    offset: SEARCH_DEFAULT_OFFSET,
    query: null,
  },
  action
) {
  switch (action.type) {
    // Get users by query
    case GET_USERS_BY_QUERY_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_USERS_BY_QUERY_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_USERS_BY_QUERY_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_SEARCH:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_HAS_MORE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
