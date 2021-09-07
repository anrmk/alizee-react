import { BANK_VERIF_STATUS_PENDING } from "../../../constants/banking_form_types";
import { generateUrl } from "../../../helpers/functions";
import { IDLE, SUCCESS, FAILURE } from "../../../constants/request_status";

export const UPDATE_BANK_REQUEST = "UPDATE_BANK_REQUEST";
export const UPDATE_BANK_SUCCESS = "UPDATE_BANK_SUCCESS";
export const UPDATE_BANK_FAILURE = "UPDATE_BANK_FAILURE";

function requestUpdateBank() {
  return {
    type: UPDATE_BANK_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
      requestStatus: IDLE,
    },
  };
}

function receiveUpdateBank(data) {
  return {
    type: UPDATE_BANK_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || {},
      requestStatus: SUCCESS,
    },
  };
}

function errorUpdateBank(message) {
  return {
    type: UPDATE_BANK_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
      requestStatus: FAILURE,
    },
  };
}

export function updateBank(api, data) {
  return async (dispatch) => {
    dispatch(requestUpdateBank());

    const url = generateUrl("updateBank");
    try {
      await api.setMethod("PUT").setData(data).query(url);

      const userInfo = {
        account: {
          accountNumber: data.accountNumber,
          routingNumber: data.routingNumber,
          type: data.type,
          verifyStatus: BANK_VERIF_STATUS_PENDING,
        },
      };

      dispatch(receiveUpdateBank(userInfo));
    } catch (e) {
      dispatch(errorUpdateBank("Error: something went wrong:", e));
    }
  };
}
