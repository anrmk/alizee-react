import { generateUrl } from "../../../helpers/functions";

export const GET_ME_REQUEST = "GET_ME_REQUEST";
export const GET_ME_SUCCESS = "GET_ME_SUCCESS";
export const GET_ME_FAILURE = "GET_ME_FAILURE";

function requestGetMe() {
  return {
    type: GET_ME_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetMe(userInfo) {
  return {
    type: GET_ME_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      userInfo,
    },
  };
}

function errorGetMe(message) {
  return {
    type: GET_ME_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getMe(api) {
  return async (dispatch) => {
    dispatch(requestGetMe());

    const url = generateUrl("getMe");
    try {
      const { data } = await api.setMethod("GET").query(url);

      dispatch(receiveGetMe(data));
    } catch {
      dispatch(errorGetMe("Error: something went wrong"));
    }
  };
}
