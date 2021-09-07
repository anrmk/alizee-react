import { generateUrl } from "../../../helpers/functions";

export const GET_SUBSCRIBE_REQUEST = "GET_SUBSCRIBE_REQUEST";
export const GET_SUBSCRIBE_SUCCESS = "GET_SUBSCRIBE_SUCCESS";
export const GET_SUBSCRIBE_FAILURE = "GET_SUBSCRIBE_FAILURE";

function requestGetSubscribe() {
  return {
    type: GET_SUBSCRIBE_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetSubscribe(data) {
  return {
    type: GET_SUBSCRIBE_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data,
    },
  };
}

function errorGetSubscribe(message) {
  return {
    type: GET_SUBSCRIBE_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getSubscribe(api, userName) {
  return async (dispatch, getState) => {
    const user = getState().user.data;
    dispatch(requestGetSubscribe());
    const url = generateUrl("getSubscribe");
    try {
      const { data } = await api
        .setMethod("GET")
        .setParams({ userName })
        .query(url);

      dispatch(receiveGetSubscribe({ ...user, ...data }));
    } catch (e) {
      dispatch(errorGetSubscribe("Error: something went wrong:", e));
    }
  };
}
