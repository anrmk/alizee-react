import {
  CREATE_MEDIA_REQUEST,
  CREATE_MEDIA_SUCCESS,
  CREATE_MEDIA_FAILURE,
} from "../actions/media";

export default function signIn(
  state = {
    isFetching: false,
    data: [],
  },
  action
) {
  switch (action.type) {
    case CREATE_MEDIA_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case CREATE_MEDIA_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case CREATE_MEDIA_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
