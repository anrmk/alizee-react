import { generateUrl } from "../../../helpers/functions";

export const GET_STORY_REQUEST = "GET_STORY_REQUEST";
export const GET_STORY_SUCCESS = "GET_STORY_SUCCESS";
export const GET_STORY_FAILURE = "GET_STORY_FAILURE";
export const RESET_STORY_SUCCESS = "RESET_STORY_SUCCESS";

function requestGetStory() {
  return {
    type: GET_STORY_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetStory(story) {
  return {
    type: GET_STORY_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      currentStory: story || {},
    },
  };
}

function errorGetStory(message) {
  return {
    type: GET_STORY_FAILURE,
    payload: {
      isFetching: false,
      hasMore: false,
      errorMessage: message,
    },
  };
}

function successResetStory(data) {
  return {
    type: RESET_STORY_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data: data || [],
      currentStory: {},
    },
  };
}

export function getStory(api, opts) {
  return async (dispatch) => {
    dispatch(requestGetStory());
    const url = generateUrl("getStory");
    try {
      const { data } = await api
        .setMethod("GET")
        .setParams({
          userName: opts.userName,
        })
        .query(url);
      dispatch(receiveGetStory(data));
    } catch (e) {
      dispatch(errorGetStory("Error: something went wrong:", e));
    }
  };
}

export function resetStory() {
  return (dispatch, getState) => {
    const { data } = getState().story;

    dispatch(successResetStory(data));
  };
}
