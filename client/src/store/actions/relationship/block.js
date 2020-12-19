import { generateUrl } from "../../../helpers/functions";

export const USER_BLOCK_REQUEST = "USER_BLOCK_REQUEST";
export const USER_BLOCK_SUCCESS = "USER_BLOCK_SUCCESS";
export const USER_BLOCK_FAILURE = "USER_BLOCK_FAILURE";

function requestrequestBlock() {
  return {
    type: USER_BLOCK_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiverequestBlock(current) {
  return {
    type: USER_BLOCK_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      current: current || [],
    },
  };
}

function errorrequestBlock(message) {
  return {
    type: USER_BLOCK_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function blockUser(api, userId, followId) {
  return async (dispatch, getState) => {
    dispatch(requestrequestBlock());

    const url = generateUrl("blockUser");
    try {
      await api.setParams({ id: userId }).query(url);

      const current = [...getState().relationship.current];

      current.forEach(item => {
        if (item.id === followId) {
          item.isFollowing = true
        }
      })

      dispatch(receiverequestBlock(current));
    } catch {
      return dispatch(errorrequestBlock("When follow was creating then something went wrong"));
    }
  };
}

