import { createSelector } from "reselect";

import { generateUrl } from "../../../helpers/functions";

export const GET_INTERESTS_REQUEST = "GET_INTERESTS_REQUEST";
export const GET_INTERESTS_SUCCESS = "GET_INTERESTS_SUCCESS";
export const GET_INTERESTS_FAILURE = "GET_INTERESTS_FAILURE";

export const RESET_INTERESTS = "RESET_INTERESTS";

function requestGetInterests() {
  return {
    type: GET_INTERESTS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetInterests(interests) {
  return {
    type: GET_INTERESTS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: interests || []
    },
  };
}

function errorGetInterests(message) {
  return {
    type: GET_INTERESTS_FAILURE,
    payload: {
      isFetching: false,
      hasMore: false,
      errorMessage: message,
    },
  };
}

export function getInterests(api) {
  return async dispatch => {
    dispatch(requestGetInterests());

    const url = generateUrl("getInterests");
    try {
      const { data } = await api
        .setMethod("GET")
        .setParams({})
        .query(url);

      data.forEach(item => {
        item["isSelected"] = false;
      })

      dispatch(receiveGetInterests(data));
    } catch (e) {
      dispatch(errorGetInterests("Error: something went wrong:", e));
    }
  };
}

const selectableInterestsSelector = (state) => state.interests.data;

export const getSelectableInterests = createSelector(
  [selectableInterestsSelector],
  (data) => data.reduce((acc, curr) => (
      { ...acc, [curr.id]: { ...curr } }
    ), {})
);
