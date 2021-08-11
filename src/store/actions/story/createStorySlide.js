import { generateUrl } from "../../../helpers/functions";

export const CREATE_STORY_SLIDE_REQUEST = "CREATE_STORY_SLIDE_REQUEST";
export const CREATE_STORY_SLIDE_SUCCESS = "CREATE_STORY_SLIDE_SUCCESS";
export const CREATE_STORY_SLIDE_FAILURE = "CREATE_STORY_SLIDE_FAILURE";

function requestCreateStory() {
  return {
    type: CREATE_STORY_SLIDE_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveCreateStory(currentStory) {
  return {
    type: CREATE_STORY_SLIDE_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      currentStory: currentStory || {},
    },
  };
}

function errorCreateStory(message) {
  return {
    type: CREATE_STORY_SLIDE_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function createStorySlide(api, storyData) {
  return async (dispatch, getState) => {
    dispatch(requestCreateStory());

    const url = generateUrl("createStorySlide");

    try {
      const mediaData = storyData.medias;

      const formData = new FormData();

      formData.append("externalLink", storyData?.link || null);

      mediaData &&
        mediaData.forEach((file) => {
          formData.append("files", file);
        });

      await api.setData(formData).query(url);

      const currentStoryState = getState().story.currentStory;
      const updatedCurrentStoryState = { ...currentStoryState };

      dispatch(receiveCreateStory(updatedCurrentStoryState));
    } catch (e) {
      dispatch(errorCreateStory("Error: something went wrong"));
    }
  };
}
