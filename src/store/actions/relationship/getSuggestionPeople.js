import { generateUrl } from "../../../helpers/functions";
import { FOLLOWERS_LENGTH, FOLLOWERS_OFFSET } from "../../../constants/feed";

export const GET_SUGGESTIONS_PEOPLE_REQUEST = "GET_SUGGESTIONS_PEOPLE_REQUEST";
export const GET_SUGGESTIONS_PEOPLE_SUCCESS = "GET_SUGGESTIONS_PEOPLE_SUCCESS";
export const GET_SUGGESTIONS_PEOPLE_FAILURE = "GET_SUGGESTIONS_PEOPLE_FAILURE";
export const RESET_SUGGESTIONS_PEOPLE = "RESET_SUGGESTIONS_PEOPLE";

function requestGetRecommended() {
  return {
    type: GET_SUGGESTIONS_PEOPLE_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetRecommended(data, start, length) {
  return {
    type: GET_SUGGESTIONS_PEOPLE_SUCCESS,
    payload: {
      isFetching: false,
      data,
      errorMessage: "",
      offset: start + FOLLOWERS_OFFSET,
      hasMore: length === FOLLOWERS_OFFSET,
    },
  };
}

function errorGetRecommended(message) {
  return {
    type: GET_SUGGESTIONS_PEOPLE_FAILURE,
    payload: {
      isFetching: false,
      hasMore: false,
      errorMessage: message,
    },
  };
}

export function resetRecommended() {
  return (dispatch) =>
    dispatch({
      type: RESET_SUGGESTIONS_PEOPLE,
      payload: {
        isFetching: false,
        data: [],
        errorMessage: "",
      },
    });
}

export function getRecommended(api, count) {
  return async (dispatch, getState) => {
    dispatch(requestGetRecommended());

    try {
      const url = generateUrl("getRecommended");
      const currentOffset = getState().users.offset;

      const { data } = await api
        .setMethod("GET")
        .setParams({
          start: currentOffset,
          length: count ?? FOLLOWERS_LENGTH,
        })
        .query(url);

      dispatch(
        receiveGetRecommended(
          [...getState().users.data, ...data],
          currentOffset,
          data.length
        )
      );
    } catch (e) {
      dispatch(errorGetRecommended("Error: something went wrong:", e));
    }
  };
}
