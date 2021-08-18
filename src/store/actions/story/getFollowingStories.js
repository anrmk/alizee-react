import { createSelector } from "reselect";

import { generateUrl } from "../../../helpers/functions";
import { STORIES_OFFSET, STORIES_LENGTH } from "../../../constants/feed";

export const GET_FOLLOWING_STORIES_REQUEST = "GET_FOLLOWING_STORIES_REQUEST";
export const GET_FOLLOWING_STORIES_SUCCESS = "GET_FOLLOWING_STORIES_SUCCESS";
export const GET_FOLLOWING_STORIES_FAILURE = "GET_FOLLOWING_STORIES_FAILURE";
export const RESET_FOLLOWING_STORIES_SUCCESS =
  "RESET_FOLLOWING_STORIES_SUCCESS";

function requestGetFollowingStories() {
  return {
    type: GET_FOLLOWING_STORIES_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetFollowingStories(posts, length, start) {
  return {
    type: GET_FOLLOWING_STORIES_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      offset: start + STORIES_OFFSET,
      hasMore: length === STORIES_LENGTH,
      data: posts || [],
    },
  };
}

function errorGetFollowingStories(message) {
  return {
    type: GET_FOLLOWING_STORIES_FAILURE,
    payload: {
      isFetching: false,
      hasMore: false,
      errorMessage: message,
    },
  };
}

// obsolete
function successResetFollowingStories() {
  return {
    type: RESET_FOLLOWING_STORIES_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      offset: 0,
      hasMore: false,
      data: [],
    },
  };
}

export function getFollowingStories(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestGetFollowingStories());

    const url = generateUrl("getFollowingStories");
    const currentOffset = getState().story.offset;
    try {
      const { data } = await api
        .setMethod("GET")
        .setParams({
          start: currentOffset,
          length: STORIES_LENGTH,
        })
        .query(url);

      dispatch(
        receiveGetFollowingStories(
          [...getState().story.data, ...data],
          data.length,
          currentOffset
        )
      );
    } catch (e) {
      dispatch(errorGetFollowingStories("Error: something went wrong:", e));
    }
  };
}

// obsolete
export function resetFollowingStories() {
  return (dispatch) => dispatch(successResetFollowingStories());
}

// Selectors
const followingsStoriesSelector = (state) => state.story.data;
const currentStorySelector = (state) => state.story.currentStory;

export const getFollowingsStoriesWithMyself = createSelector(
  [followingsStoriesSelector, currentStorySelector],
  (fStories, mStories) => ({
    mStories,
    fStories,
  })
);
