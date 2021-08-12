import { generateUrl } from "../../../../helpers/functions";

export const CREATE_CARD_REQUEST = "CREATE_CARD_REQUEST";
export const CREATE_CARD_SUCCESS = "CREATE_CARD_SUCCESS";
export const CREATE_CARD_FAILURE = "CREATE_CARD_FAILURE";

function requestCreateCard() {
  return {
    type: CREATE_CARD_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveCreateCard(data) {
  return {
    type: CREATE_CARD_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
    },
  };
}

function errorCreateCard(message) {
  return {
    type: CREATE_CARD_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function createCard(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestCreateCard());

    const { cards = [], wallet = {} } = getState().settings.data;

    const url = generateUrl("createCard");

    try {
      const { data } = await api.setMethod("POST").setData(opts).query(url);

      dispatch(
        receiveCreateCard({
          wallet,
          cards: [...cards, data],
        })
      );
      return true;
    } catch (e) {
      dispatch(errorCreateCard("Error: something went wrong:", e));
      return false;
    }
  };
}
