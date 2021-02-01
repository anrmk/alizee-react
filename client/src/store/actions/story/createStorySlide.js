import { MEDIA_CONTENT } from "../../../constants/media_types";
import { generateUrl, generateFileUrl, isEmptyObject } from "../../../helpers/functions";
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
      currentStory: currentStory || {}
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

export function createStorySlide(api, storyData) {
  return async (dispatch, getState) => {
    dispatch(requestCreateStory());

    const url = generateUrl("createStorySlide");
    
    try {
      const mediaData = storyData.medias;
      let media = [];
      if (mediaData.length > 0) {
        await dispatch(createMedia(api, mediaData, MEDIA_CONTENT));

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

      const currentStoryState = getState().story.currentStory;
      const updatedCurrentStoryState = { ...currentStoryState };

      if (isEmptyObject(currentStoryState)) {
        const signInState = getState().signIn.userInfo;
        updatedCurrentStoryState.user = {
          userName: signInState.userName,
          name: signInState.name,
          avatarUrl: signInState.avatarUrl
        }
        updatedCurrentStoryState.userId = signInState.id;
      }

      updatedCurrentStoryState.slides = [data, ...(updatedCurrentStoryState?.slides || [])];
      updatedCurrentStoryState.thumbnailUrl = data.media.thumbnailUrl;

      dispatch(receiveCreateStory(updatedCurrentStoryState));
    } catch(e) {
      dispatch(errorCreateStory("Error: something went wrong"));
    }
  }
}
