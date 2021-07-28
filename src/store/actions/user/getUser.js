import { generateUrl } from "../../../helpers/functions";
import { receiveSignIn } from "../signIn";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export const RESET_USER = "RESET_USER";

function requestGetUser() {
  return {
    type: GET_USER_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetUser(user) {
  return {
    type: GET_USER_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: user,
    },
  };
}

function errorGetUser(message) {
  return {
    type: GET_USER_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function resetUser() {
  return (dispatch) =>
    dispatch({
      type: RESET_USER,
      payload: {
        isFetching: false,
        errorMessage: "",
        data: {},
      },
    });
}

export function getUser(api, username, me = false) {
  return async (dispatch) => {
    dispatch(requestGetUser());

    const url = generateUrl("getUser");
    try {
      const { data } = await api
        .setMethod("GET")
        .setParams({ username })
        .query(url);

      if (!me) {
        dispatch(receiveGetUser(data));
      } else {
        dispatch(receiveSignIn(data));
      }
    } catch {
      dispatch(errorGetUser("Error: something went wrong"));
    }
  };
}
