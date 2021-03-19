import { createSelector } from "reselect";

import { generateUrl } from "../../../helpers/functions";
import { getHashTags } from "../hashTags";

export const GET_ACCOUNT_INTERESTS_REQUEST = 'GET_ACCOUNT_INTERESTS_REQUEST';
export const GET_ACCOUNT_INTERESTS_SUCCESS = 'GET_ACCOUNT_INTERESTS_SUCCESS';
export const GET_ACCOUNT_INTERESTS_FAILURE = 'GET_ACCOUNT_INTERESTS_FAILURE';

function requestGetAccountInterests() {
  return {
    type: GET_ACCOUNT_INTERESTS_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: ''
    }
  }
}

export function receiveGetAccountInterests(data) {
  return {
    type: GET_ACCOUNT_INTERESTS_SUCCESS,
    payload: {
      isFetching: false,
      interests: data || [],
      errorMessage: '',
    }
  }
}

function errorGetAccountInterests(message) {
  return {
    type: GET_ACCOUNT_INTERESTS_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    }
  }
}

export function getAccountInterests(api) {
  return async (dispatch, getState) => {
    dispatch(requestGetAccountInterests());

    const url = generateUrl("getAccountInterests");
    try {
      await dispatch(getHashTags(api));
      const interests = getState().hashTags.data;

      const { data } = await api.setMethod("GET").query(url);

      data.forEach(item => {
        item["isSelected"] = true;
      })

      dispatch(receiveGetAccountInterests([...data, ...interests]));
  } catch (e) {
      dispatch(errorGetAccountInterests("Error: something went wrong:", e));
    }
  }
}

const mergedInterestsSelector = (state) => state.settings.interests;

export const getMergedInterests = createSelector(
  [mergedInterestsSelector],
  (data) => data.reduce((acc, curr) => {
    if (!acc[curr.id] || curr.isSelected) {
      return ({ ...acc, [curr.id]: { ...curr } });
    }
    return acc;
  }
  , {})
);
