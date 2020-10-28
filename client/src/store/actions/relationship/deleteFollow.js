import { generateUrl } from "../../../helpers/functions";

export const DELETE_FOLLOW_REQUEST = "DELETE_FOLLOW_REQUEST";
export const DELETE_FOLLOW_SUCCESS = "DELETE_FOLLOW_SUCCESS";
export const DELETE_FOLLOW_FAILURE = "DELETE_FOLLOW_FAILURE";

function requestDeleteFollow() {
  return {
    type: DELETE_FOLLOW_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
} 

function receiveDeleteFollow(current) {
  return {
    type: DELETE_FOLLOW_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      current: current || [],
    },
  };
}

function errorDeleteFollow(message) {
  return {
    type: DELETE_FOLLOW_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function deleteFollow(api, userId, followId) {
  return async (dispatch, getState) => {
    dispatch(requestDeleteFollow());

    const url = generateUrl("deleteFollow");
    try {
      await api.setMethod("DELETE").setParams({ id: userId }).query(url);

      const current = [...getState().relationship.current];

      current.forEach(item => {
        if (item.id === followId) {
          item.isFollowing = false
        }
      })

      dispatch(receiveDeleteFollow(current));
    } catch (e) {
      return dispatch(errorDeleteFollow("When follow was deleting then something went wrong"));
    }
  };
}
