import {
  GET_PEOPLE_SUGGESTIONS_SUCCESS,
  GET_PEOPLE_SUGGESTIONS_FAILURE,
  GET_PEOPLE_SUGGESTIONS_REQUEST,
} from "../actions/suggestion";

export default function suggestionPeople(
  state = {
    isFetching: false,
    data: [],
	hasMore:false, 
	offset: 0,
    errorMessage: "",
  },
  action
) {
  switch (action.type) {
    case GET_PEOPLE_SUGGESTIONS_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_PEOPLE_SUGGESTIONS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case GET_PEOPLE_SUGGESTIONS_FAILURE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
}
