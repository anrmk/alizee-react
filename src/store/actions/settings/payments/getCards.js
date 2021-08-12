import { generateUrl } from "../../../../helpers/functions";

export const GET_CARDS_REQUEST = "GET_CARDS_REQUEST";
export const GET_CARDS_SUCCESS = "GET_CARDS_SUCCESS";
export const GET_CARDS_FAILURE = "GET_CARDS_FAILURE";

function requestGetCards() {
  return {
    type: GET_CARDS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetCards(data) {
  return {
    type: GET_CARDS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
    },
  };
}

function errorGetCards(message) {
  return {
    type: GET_CARDS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getCards(api) {
  return async (dispatch) => {
    dispatch(requestGetCards());

    const url = generateUrl("getCards");
    try {
      // TODO: CONNECT API
      //   const { data } = await api.setMethod("GET").query(url);

      dispatch(receiveGetCards({}));
    } catch (e) {
      dispatch(errorGetCards("Error: something went wrong:", e));
    }
  };
}
