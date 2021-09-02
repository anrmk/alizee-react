import { generateUrl } from "../../../../helpers/functions";
import { IDLE, SUCCESS, FAILURE } from "../../../../constants/request_status";

export const VERIFY_CARD_REQUEST = "VERIFY_CARD_REQUEST";
export const VERIFY_CARD_SUCCESS = "VERIFY_CARD_SUCCESS";
export const VERIFY_CARD_FAILURE = "VERIFY_CARD_FAILURE";

function requestVerifyCard() {
  return {
    type: VERIFY_CARD_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
      requestStatus: IDLE,
    },
  };
}

function receiveVerifyCard(data) {
  return {
    type: VERIFY_CARD_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
      requestStatus: SUCCESS,
    },
  };
}

function errorVerifyCard(message) {
  return {
    type: VERIFY_CARD_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
      requestStatus: FAILURE,
    },
  };
}

export function verifyCard(api, id) {
  return async (dispatch, getState) => {
    dispatch(requestVerifyCard());
    const { cards = [], wallet = {} } = getState().settings.data;

    const url = generateUrl("cardVerify");

    try {
      await api.setMethod("POST").setParams({ id }).query(url);

      const updatedCards = cards.map((card) =>
        card.id === id
          ? { ...card, clickable: false }
          : { ...card, clickable: true }
      );

      dispatch(receiveVerifyCard({ wallet, cards: updatedCards }));
    } catch (e) {
      dispatch(errorVerifyCard("Error: something went wrong:", e));
    }
  };
}
