import { generateUrl } from "../../../helpers/functions";
import { HOT_STREAMERS_LENGTH } from "../../../constants/stream";

export const GET_HOT_STREAMERS_REQUEST = "GET_HOT_STREAMERS_REQUEST";
export const GET_HOT_STREAMERS_SUCCESS = "GET_HOT_STREAMERS_SUCCESS";
export const GET_HOT_STREAMERS_FAILURE = "GET_HOT_STREAMERS_FAILURE";

function requestGetHotStreamers() {
  return {
    type: GET_HOT_STREAMERS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetHotStreamers(data) {
  return {
    type: GET_HOT_STREAMERS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      hotStreamers: data,
    },
  };
}

function errorGetHotStreamers(message) {
  return {
    type: GET_HOT_STREAMERS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getHotStreamers(api) {
  return async (dispatch) => {
    dispatch(requestGetHotStreamers());

    const url = generateUrl("getHotStreamers");
    try {
      const { data } = await api.setMethod("GET").setParams({ length: HOT_STREAMERS_LENGTH }).query(url);

      dispatch(receiveGetHotStreamers(data));
    } catch (e) {
      dispatch(errorGetHotStreamers("Error: something went wrong"));
    }
  };
}
