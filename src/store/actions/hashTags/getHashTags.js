import { createSelector } from "reselect";

import { generateUrl } from "../../../helpers/functions";

export const GET_HASH_TAGS_REQUEST = "GET_HASH_TAGS_REQUEST";
export const GET_HASH_TAGS_SUCCESS = "GET_HASH_TAGS_SUCCESS";
export const GET_HASH_TAGS_FAILURE = "GET_HASH_TAGS_FAILURE";

export const RESET_HASH_TAGS = "RESET_HASH_TAGS";

function requestGetHashTags() {
  return {
    type: GET_HASH_TAGS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetHashTags(hashTags) {
  return {
    type: GET_HASH_TAGS_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: hashTags || []
    },
  };
}

function errorGetHashTags(message) {
  return {
    type: GET_HASH_TAGS_FAILURE,
    payload: {
      isFetching: false,
      hasMore: false,
      errorMessage: message,
    },
  };
}

export function getHashTags(api) {
  return async dispatch => {
    dispatch(requestGetHashTags());

    const url = generateUrl("getHashTags");
    try {
      const { data } = await api
        .setMethod("GET")
        .setParams({})
        .query(url);

      data.forEach(item => {
        item["isSelected"] = false;
      })

      dispatch(receiveGetHashTags(data));
    } catch (e) {
      dispatch(errorGetHashTags("Error: something went wrong:", e));
    }
  };
}

const selectableHashTagsSelector = (state) => state.hashTags.data;

export const getSelectableHashTags = createSelector(
  [selectableHashTagsSelector],
  (data) => data.reduce((acc, curr) => (
      { ...acc, [curr.id]: { ...curr } }
    ), {})
);
