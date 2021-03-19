import { generateUrl } from "../../../helpers/functions";
import { receiveGetAccountPersonalized } from ".";

export const CREATE_ACCOUNT_INTERESTS_REQUEST = "CREATE_ACCOUNT_INTERESTS_REQUEST";
export const CREATE_ACCOUNT_INTERESTS_SUCCESS = "CREATE_ACCOUNT_INTERESTS_SUCCESS";
export const CREATE_ACCOUNT_INTERESTS_FAILURE = "CREATE_ACCOUNT_INTERESTS_FAILURE";

function requestCreateAccountInterests() {
  return {
    type: CREATE_ACCOUNT_INTERESTS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveCreateAccountInterests() {
  return {
    type: CREATE_ACCOUNT_INTERESTS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
    },
  };
}

function errorCreateAccountInterests(message) {
  return {
    type: CREATE_ACCOUNT_INTERESTS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function createAccountInterests(api, ids) {
  return async dispatch => {
    dispatch(requestCreateAccountInterests());

    const url = generateUrl("createAccountInterests");
    try {
      await api.setData(ids).query(url);

      dispatch(receiveCreateAccountInterests());
      dispatch(receiveGetAccountPersonalized(true));
    } catch (e) {
      dispatch(errorCreateAccountInterests("Error: something went wrong:", e));
    }
  };
}
