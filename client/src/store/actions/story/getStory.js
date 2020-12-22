import { generateUrl, generateFileUrl, getOffset } from "../../../helpers/functions";
import { STORIES_OFFSET } from "../../../constants/feed";

export const GET_STORY_REQUEST = "GET_STORY_REQUEST";
export const GET_STORY_SUCCESS = "GET_STORY_SUCCESS";
export const GET_STORY_FAILURE = "GET_STORY_FAILURE";
export const RESET_STORY_SUCCESS = "RESET_STORY_SUCCESS";

function requestGetStory() {
  return {
    type: GET_STORY_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: ""
    }
  }
}

function receiveGetStory(story, total, start, hasMore) {
  return {
    type: GET_STORY_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      offset: getOffset(start, total, STORIES_OFFSET),
      hasMore,
      currentStory: story || []
    }
  }
}

function errorGetStory(message) {
  return {
    type: GET_STORY_FAILURE,
    payload: {
      isFetching: false,
      hasMore: false,
      errorMessage: message
    }
  }
}

function successResetStory() {
  return {
    type: RESET_STORY_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      offset: 0,
      hasMore: false,
      currentStory: []
    }
  }
}

export function getStory(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestGetStory());

    const url = generateUrl("getStory");
    try {
      const { data } = await api
        .setMethod("GET")
        .setParams({
          userId: opts.userId,
          start: 0,
          length: opts.length
        })
        .query(url);

      data.data.forEach((storiesItem) => {
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

      const transformedData = [];
      if (data.data.length && data.data[0]?.stories) {
        data.data[0].stories.forEach(item => {
          transformedData.push({
              ...item,
              media: {
                ...item.media,
                thumbnailUrl: generateFileUrl(process.env.REACT_APP_DOMAIN, item.media.thumbnailUrl),
                url: generateFileUrl(process.env.REACT_APP_DOMAIN, item.media.url)
              },
              user: {
                ...item.user,
                avatarUrl: generateFileUrl(process.env.REACT_APP_DOMAIN, item.user.avatarUrl)
              }
           });
        })
      }

      dispatch(
        receiveGetStory(
          [...getState().story.currentStory, ...transformedData],
          data.recordsTotal,
          0,
          !!data.data.length
        )
      );
    } catch (e) {
      dispatch(errorGetStory("Error: something went wrong:", e));
    }
  }
}

export function resetStory() {
  return dispatch => dispatch(successResetStory());
}
