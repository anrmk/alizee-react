import {
  GET_HASH_TAGS_REQUEST,
  GET_HASH_TAGS_SUCCESS,
  GET_HASH_TAGS_FAILURE,
} from "../actions/hashTags";

export default function interests(
  state = {
    isFetching: false,
    data: [],
  },
  action
) {
  switch (action.type) {
    // Get Interests
    case GET_HASH_TAGS_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_HASH_TAGS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_HASH_TAGS_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
