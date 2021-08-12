import { generateUrl } from "../../../helpers/functions";

export const UPDATE_WALLET_REQUEST = "UPDATE_WALLET_REQUEST";
export const UPDATE_WALLET_SUCCESS = "UPDATE_WALLET_SUCCESS";
export const UPDATE_WALLET_FAILURE = "UPDATE_WALLET_FAILURE";

function requestUpdateWallet() {
  return {
    type: UPDATE_WALLET_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveUpdateWallet(data) {
  return {
    type: UPDATE_WALLET_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || [],
    },
  };
}

function errorUpdateWallet(message) {
  return {
    type: UPDATE_WALLET_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function updateWallet(api, status) {
  return async (dispatch, getState) => {
    dispatch(requestUpdateWallet());
    const { cards = [], wallet = {} } = getState().settings.data;

    const url = generateUrl("makeWalletDefault");
    try {
      await api
        .setMethod("PUT")
        .setParams({
          isDefault: status,
        })
        .query(url);

      const updatedSettings = {
        cards,
        wallet: { ...wallet, isDefault: status },
      };

      dispatch(receiveUpdateWallet(updatedSettings));
      return true;
    } catch (e) {
      dispatch(errorUpdateWallet("Error: something went wrong:", e));
      return false;
    }
  };
}
