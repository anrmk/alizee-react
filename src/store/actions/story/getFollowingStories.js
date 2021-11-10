import { createSelector } from "reselect";

import { generateUrl, addDays } from "../../../helpers/functions";
import { STORIES_OFFSET, STORIES_LENGTH } from "../../../constants/feed";

export const GET_FOLLOWING_STORIES_REQUEST = "GET_FOLLOWING_STORIES_REQUEST";
export const GET_FOLLOWING_STORIES_SUCCESS = "GET_FOLLOWING_STORIES_SUCCESS";
export const GET_FOLLOWING_STORIES_FAILURE = "GET_FOLLOWING_STORIES_FAILURE";
export const RESET_FOLLOWING_STORIES_SUCCESS =
  "RESET_FOLLOWING_STORIES_SUCCESS";
export const SET_ORDER_STORIES = "SET_ORDER_STORIES";

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

export function setOrderStories(data) {
  return {
    type: SET_ORDER_STORIES,
    payload: {
      data,
    },
  };
}

const modifyStories = (data, userName) => {
  const watchedStories =
    JSON.parse(localStorage.getItem("WatchedStories")) || {};

  const currentDate = new Date();

  const updatedStories = [];
  const showedStories = [];

  for (let index = 0; index < data.length; index += 1) {
    const currentElement = data[index];
    const isOwner = currentElement.userName === userName;
    const storyShowedDate = watchedStories[currentElement.userName];
    let isExpiredDate = true;

    if (storyShowedDate) {
      isExpiredDate = addDays(storyShowedDate, 1) < currentDate;
      if (isExpiredDate) {
        const updatedWatchedStories = { ...watchedStories };
        delete updatedWatchedStories[currentElement.userName];
        localStorage.setItem(
          "WatchedStories",
          JSON.stringify(updatedWatchedStories)
        );
      }
    }
    if (isOwner) {
      updatedStories.unshift({
        ...currentElement,
        isWatched: storyShowedDate ? !isExpiredDate : false,
      });
    } else {
      isExpiredDate
        ? updatedStories.push({
            ...currentElement,
            isWatched: storyShowedDate ? !isExpiredDate : false,
          })
        : showedStories.push({ ...currentElement, isWatched: true });
    }
  }

  return [...updatedStories, ...showedStories];
};

export function getFollowingStories(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestGetFollowingStories());

    const url = generateUrl("getFollowingStories");
    const currentOffset = getState().story.offset;
    const { userName } = getState().signIn.userInfo;
    try {
      const { data } = await api
        .setMethod("GET")
        .setParams({
          start: currentOffset,
          length: STORIES_LENGTH,
        })
        .query(url);

      const updatedData = modifyStories(data, userName);

      dispatch(
        receiveGetFollowingStories(
          [...getState().story.data, ...updatedData],
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

export function setFollowingStories() {
  return (dispatch, getState) => {
    const { data } = getState().story;
    const { userName } = getState().signIn.userInfo;

    const updatedData = modifyStories(data, userName);
    dispatch(setOrderStories([...updatedData]));
  };
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
