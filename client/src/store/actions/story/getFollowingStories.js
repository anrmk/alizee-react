import { createSelector } from "reselect";

import { generateUrl, generateFileUrl, getOffset } from "../../../helpers/functions";
import { STORIES_OFFSET } from "../../../constants/feed";

export const GET_FOLLOWING_STORIES_REQUEST = "GET_FOLLOWING_STORIES_REQUEST";
export const GET_FOLLOWING_STORIES_SUCCESS = "GET_FOLLOWING_STORIES_SUCCESS";
export const GET_FOLLOWING_STORIES_FAILURE = "GET_FOLLOWING_STORIES_FAILURE";
export const RESET_FOLLOWING_STORIES_SUCCESS = "RESET_FOLLOWING_STORIES_SUCCESS";

function requestGetFollowingStories() {
  return {
    type: GET_FOLLOWING_STORIES_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: ""
    }
  }
}

function receiveGetFollowingStories(posts, total, start, hasMore) {
  return {
    type: GET_FOLLOWING_STORIES_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      offset: getOffset(start, total, STORIES_OFFSET),
      hasMore,
      data: posts || []
    }
  }
}

function errorGetFollowingStories(message) {
  return {
    type: GET_FOLLOWING_STORIES_FAILURE,
    payload: {
      isFetching: false,
      hasMore: false,
      errorMessage: message
    }
  }
}

function successResetFollowingStories() {
  return {
    type: RESET_FOLLOWING_STORIES_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      offset: 0,
      hasMore: false,
      data: []
    }
  }
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
          length: opts.length
        })
        .query(url);

      data.data.forEach((story) => {
        story.slides.forEach((slide) => {
          if (!slide.media) return;

          slide.media = {
            ...slide.media,
            thumbnailUrl: generateFileUrl(process.env.REACT_APP_DOMAIN, slide.media.thumbnailUrl),
            url: generateFileUrl(process.env.REACT_APP_DOMAIN, slide.media.url)
          }
        })
        story.thumbnailUrl = generateFileUrl(process.env.REACT_APP_DOMAIN, story.thumbnailUrl);

        story.user = {
          ...story.user,
          avatarUrl: generateFileUrl(process.env.REACT_APP_DOMAIN, story.user.avatarUrl)
        };
      });

      dispatch(
        receiveGetFollowingStories(
          [...getState().story.data, ...data.data],
          data.recordsTotal,
          currentOffset,
          !!data.data.length
        )
      );
    } catch (e) {
      dispatch(errorGetFollowingStories("Error: something went wrong:", e));
    }
  }
}

export function resetFollowingStories() {
  return dispatch => dispatch(successResetFollowingStories());
}

// Selectors
const followingsStoriesSelector = (state) => state.story.data;
const currentStorySelector = (state) => state.story.currentStory;

export const getFollowingsStoriesWithMyself = createSelector(
  [followingsStoriesSelector, currentStorySelector], 
  (fStories, mStories) => ({
    mStories,
    fStories
  }));
