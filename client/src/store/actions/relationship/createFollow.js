import { generateUrl } from "../../../helpers/functions";

export const CREATE_FOLLOW_REQUEST = "CREATE_FOLLOW_REQUEST";
export const CREATE_FOLLOW_SUCCESS = "CREATE_FOLLOW_SUCCESS";
export const CREATE_FOLLOW_FAILURE = "CREATE_FOLLOW_FAILURE";

function requestCreateFollow() {
  return {
    type: CREATE_FOLLOW_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveCreateFollow(followers) {
  return {
    type: CREATE_FOLLOW_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      followers: followers || [],
    },
  };
}

function errorCreateFollow(message) {
  return {
    type: CREATE_FOLLOW_FAILURE,
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

      const people = [...getState().relationship.followers];
      const personIndex = people.findIndex(item => item.userId === userId);
      people[personIndex]["isFollowing"] = true;

      dispatch(receiveCreateFollow(people));
    } catch {
      return dispatch(errorCreateFollow("When follow was creating then something went wrong"));
    }
  };
}

