import { generateUrl } from "../../../helpers/functions";

export const FOLLOW_PEOPLE_SUGGESTIONS_REQUEST = "FOLLOW_PEOPLE_SUGGESTIONS_REQUEST";
export const FOLLOW_PEOPLE_SUGGESTIONS_SUCCESS = "FOLLOW_PEOPLE_SUGGESTIONS_SUCCESS";
export const FOLLOW_PEOPLE_SUGGESTIONS_FAILURE = "FOLLOW_PEOPLE_SUGGESTIONS_FAILURE";

function requestCreateFollow() {
  return {
    type: FOLLOW_PEOPLE_SUGGESTIONS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveCreateFollow(data) {
  return {
    type: FOLLOW_PEOPLE_SUGGESTIONS_SUCCESS,
    payload: {
      people: {
        isFetching: false,
        errorMessage: "",
        data
      }
    }
  };
}

function errorCreateFollow(message) {
  return {
    type: FOLLOW_PEOPLE_SUGGESTIONS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function createFollow(api, userId) {
  return async (dispatch, getState) => {
    dispatch(requestCreateFollow());

    try {
      const url = generateUrl("createFollow");
      await api.setParams({ id: userId }).query(url);

      const people = [...getState().suggestion.people.data];
      const personIndex = people.findIndex(item => item.id === userId);
      people[personIndex]["isFollowing"] = true;

      dispatch(receiveCreateFollow(people));
    } catch (e) {
      return dispatch(errorCreateFollow(e));
    }
  };
}
