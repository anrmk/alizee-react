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
      data: [],
      currentStory: []
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

      data.data.forEach((storiesItem) => {
        const stories = storiesItem.stories.length && storiesItem.stories;
        const user = stories[0]?.user;
        const previewUrl = stories[0]?.media?.thumbnailUrl;
        storiesItem.id = stories[0]?.id;
        storiesItem.avatarUrl = generateFileUrl(process.env.REACT_APP_DOMAIN, user.avatarUrl);
        storiesItem.previewUrl = generateFileUrl(process.env.REACT_APP_DOMAIN, previewUrl);
        storiesItem.name = user.name;
        storiesItem.stories.forEach((story) => {
          story.media = {
            ...story.media,
            thumbnailUrl: generateFileUrl(process.env.REACT_APP_DOMAIN, story.media.thumbnailUrl),
            url: generateFileUrl(process.env.REACT_APP_DOMAIN, story.media.url)
          }
          story.user = {
            ...story.user,
            avatarUrl: generateFileUrl(process.env.REACT_APP_DOMAIN, story.user.avatarUrl)
          };
        })
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
const signInSelector = (state) => state.signIn?.userInfo;

export const getFollowingsStoriesWithMyself = createSelector(
  [followingsStoriesSelector, currentStorySelector, signInSelector], 
  (fStories, mStories, userInfo) => ({
    mStories: {
      ...mStories[0],
      user: userInfo
    },
    fStories
  }));
