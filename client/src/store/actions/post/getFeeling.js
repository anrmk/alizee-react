import { generateUrl } from "../../../helpers/functions";

export const GET_FEELING_REQUEST = "GET_FEELING_REQUEST";
export const GET_FEELING_SUCCESS = "GET_FEELING_SUCCESS";
export const GET_FEELING_FAILURE = "GET_FEELING_FAILURE";

export const RESET_FEELING = "RESET_FEELING";

function requestGetFeeling() {
  return {
    type: GET_FEELING_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetPosts(feeling) {
  return {
    type: GET_FEELING_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      currentFeeling: feeling || "",
    },
  };
}

function errorGetFeeling(message) {
  return {
    type: GET_FEELING_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function resetFeeling() {
  return (dispatch) =>
    dispatch({
      type: RESET_FEELING,
      payload: {
        isFetching: false,
        errorMessage: "",
        currentFeeling: "",
      },
    });
}

export function getFeeling(api, opts) {
  return async (dispatch) => {
    dispatch(requestGetFeeling());

    const url = generateUrl("getPosts");
    try {
      const { data } = await api
        .setMethod("GET")
        .setParams({
          userId: opts.userId,
          start: 0,
          length: 1,
          type: 1,
        })
        .query(url);

      let feeling = "";
      const lastFeeling = data.data[data.data.length - 1];
      if (lastFeeling) {
        feeling = lastFeeling?.description;
      }

      console.log("getFeeling", feeling);

      dispatch(
        receiveGetPosts(feeling)
      );
    } catch (e) {
      dispatch(errorGetFeeling("Error: something went wrong:", e));
    }
  };
}
