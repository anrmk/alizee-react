import { generateUrl } from "../../../helpers/functions";
import { receiveGetAccountPersonalized } from "../settings";

export const CREATE_INTERESTS_REQUEST = "CREATE_INTERESTS_REQUEST";
export const CREATE_INTERESTS_SUCCESS = "CREATE_INTERESTS_SUCCESS";
export const CREATE_INTERESTS_FAILURE = "CREATE_INTERESTS_FAILURE";

function requestCreateInterests() {
  return {
    type: CREATE_INTERESTS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveCreateInterests() {
  return {
    type: CREATE_INTERESTS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
    },
  };
}

function errorCreateInterests(message) {
  return {
    type: CREATE_INTERESTS_FAILURE,
    payload: {
      isFetching: false,
      hasMore: false,
      errorMessage: message,
    },
  };
}

export function createInterests(api, ids) {
  return async dispatch => {
    dispatch(requestCreateInterests());

    const url = generateUrl("createInterests");
    try {
      await api.setData(ids).query(url);

      dispatch(receiveCreateInterests());
      dispatch(receiveGetAccountPersonalized(true));
    } catch (e) {
      dispatch(errorCreateInterests("Error: something went wrong:", e));
    }
  };
}
