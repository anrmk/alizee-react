import { generateUrl } from "../../../helpers/functions";

export const UPDATE_PERSONAL_REQUEST = "UPDATE_PERSONAL_REQUEST";
export const UPDATE_PERSONAL_SUCCESS = "UPDATE_PERSONAL_SUCCESS";
export const UPDATE_PERSONAL_FAILURE = "UPDATE_PERSONAL_FAILURE";

function requestUpdatePersonal() {
  return {
    type: UPDATE_PERSONAL_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveUpdatePersonal(data) {
  return {
    type: UPDATE_PERSONAL_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
    },
  };
}

function errorUpdatePersonal(message) {
  return {
    type: UPDATE_PERSONAL_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function updatePersonal(api, data) {
  return async (dispatch) => {
    dispatch(requestUpdatePersonal());

    const url = generateUrl("updatePersonal");
    try {
      await api.setMethod("PUT").setData(data).query(url);

      dispatch(receiveUpdatePersonal(data));
    } catch (e) {
      dispatch(errorUpdatePersonal("Error: something went wrong:", e));
    }
  };
}
