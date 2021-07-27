import { generateUrl } from "../../../helpers/functions";

export const GET_PERSONAL_REQUEST = "GET_PERSONAL_REQUEST";
export const GET_PERSONAL_SUCCESS = "GET_PERSONAL_SUCCESS";
export const GET_PERSONAL_FAILURE = "GET_PERSONAL_FAILURE";

function requestGetPersonal() {
  return {
    type: GET_PERSONAL_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetPersonal(data) {
  return {
    type: GET_PERSONAL_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
    },
  };
}

function errorGetPersonal(message) {
  return {
    type: GET_PERSONAL_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getPersonal(api) {
  return async (dispatch) => {
    dispatch(requestGetPersonal());

    const url = generateUrl("getPersonal");
    try {
      const { data } = await api.setMethod("GET").query(url);

      dispatch(receiveGetPersonal(data));
    } catch (e) {
      dispatch(errorGetPersonal("Error: something went wrong:", e));
    }
  };
}
