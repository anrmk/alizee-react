import { generateUrl, generateFileUrl } from "../../../helpers/functions";
import { createMedia } from "../media";

export const CREATE_STORY_SLIDE_REQUEST = "CREATE_STORY_SLIDE_REQUEST";
export const CREATE_STORY_SLIDE_SUCCESS = "CREATE_STORY_SLIDE_SUCCESS";
export const CREATE_STORY_SLIDE_FAILURE = "CREATE_STORY_SLIDE_FAILURE";

function requestCreateStory() {
  return {
    type: CREATE_STORY_SLIDE_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    }
  }
}

function receiveCreateStory(currentStory) {
  return {
    type: CREATE_STORY_SLIDE_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      currentStory: currentStory || []
    }
  }
}

function errorCreateStory(message) {
  return {
    type: CREATE_STORY_SLIDE_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    }
  }
}

export function createStorySlide(api, storyData, mediaData=[]) {
  return async (dispatch, getState) => {
    dispatch(requestCreateStory());

    const url = generateUrl("createStorySlide");
    
    try {
      let media = [];
      if (mediaData.length > 0) {
        await dispatch(createMedia(api, mediaData));

        const mediaErrorMessage = getState().media.errorMessage;
        if (mediaErrorMessage) {
          throw mediaErrorMessage;
        }

        media = getState().media.data;
      }

      const { data } = await api
        .setData({ 
          externalLink: storyData?.link || null,
          mediaId: media[0].id
         })
        .query(url);

      data.media.url = generateFileUrl(process.env.REACT_APP_DOMAIN, data.media.url);
      data.media.thumbnailUrl = generateFileUrl(process.env.REACT_APP_DOMAIN, data.media.thumbnailUrl);

      const updatedCurrentStoryState = { ...getState().story.currentStory };
      updatedCurrentStoryState.slides = [data, ...updatedCurrentStoryState.slides]
      updatedCurrentStoryState.thumbnailUrl = data.media.thumbnailUrl;

      dispatch(receiveCreateStory(updatedCurrentStoryState));
    } catch(e) {
      dispatch(errorCreateStory("Error: something went wrong"));
    }
  }
}
