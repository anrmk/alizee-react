import { CREATE_CHAT_MEDIA_REQUEST, CREATE_CHAT_MEDIA_SUCCESS, CREATE_CHAT_MEDIA_FAILURE } from "../actions/chat";

export default function chatMediaReducer(
  state = {
    isFetching: false,
    data: [],
  },
  action
) {
  switch (action.type) {
    // Create chat media
    case CREATE_CHAT_MEDIA_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case CREATE_CHAT_MEDIA_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case CREATE_CHAT_MEDIA_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
