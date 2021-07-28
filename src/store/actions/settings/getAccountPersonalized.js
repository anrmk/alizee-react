import { generateUrl } from "../../../helpers/functions";

export const GET_ACCOUNT_PERSONALIZED_REQUEST =
  "GET_ACCOUNT_PERSONALIZED_REQUEST";
export const GET_ACCOUNT_PERSONALIZED_SUCCESS =
  "GET_ACCOUNT_PERSONALIZED_SUCCESS";
export const GET_ACCOUNT_PERSONALIZED_FAILURE =
  "GET_ACCOUNT_PERSONALIZED_FAILURE";

function requestGetAccountPersonalized() {
  return {
    type: GET_ACCOUNT_PERSONALIZED_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

export function receiveGetAccountPersonalized(personalized = false) {
  return {
    type: GET_ACCOUNT_PERSONALIZED_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      isAccountPersonalized: personalized,
    },
  };
}

function errorGetAccountPersonalized(message) {
  return {
    type: GET_ACCOUNT_PERSONALIZED_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getAccountPersonalized(api) {
  return async (dispatch) => {
    dispatch(requestGetAccountPersonalized());

    const url = generateUrl("getAccountPersonalized");
    try {
      const { data } = await api.setMethod("GET").query(url);

      dispatch(receiveGetAccountPersonalized(data));
    } catch (e) {
      dispatch(errorGetAccountPersonalized("Error: something went wrong:", e));
    }
  };
}
