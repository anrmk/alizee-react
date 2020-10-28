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

function receiveCreateFollow(current) {
  return {
    type: CREATE_FOLLOW_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      current: current || [],
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

export function createFollow(api, userId, followId) {
  return async (dispatch, getState) => {
    dispatch(requestCreateFollow());

    const url = generateUrl("createFollow");
    try {
      await api.setParams({ id: userId }).query(url);

      const current = [...getState().relationship.current];

      current.forEach(item => {
        if (item.id === followId) {
          item.isFollowing = true
        }
      })

      dispatch(receiveCreateFollow(current));
    } catch {
      return dispatch(errorCreateFollow("When follow was creating then something went wrong"));
    }
  };
}

