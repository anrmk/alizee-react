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

function receiveCreateStory(data) {
  return {
    type: CREATE_STORY_SLIDE_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      data,
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

const updateLocalStorage = (userName) => {
  const watchedStories =
    JSON.parse(localStorage.getItem("WatchedStories")) || {};
  const updatedWatchedStories = { ...watchedStories };
  delete updatedWatchedStories[userName];
  localStorage.setItem("WatchedStories", JSON.stringify(updatedWatchedStories));
};

export function createStorySlide(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestCreateStory());

    const url = generateUrl("createStorySlide");

    try {
      const mediaData = opts.medias;

      const formData = new FormData();
      formData.append("externalLink", opts?.link || null);

      mediaData &&
        mediaData.forEach((file) => {
          formData.append("files", file);
        });

      const { data } = await api.setData(formData).query(url);
      const stories = getState().story.data;
      const storyIndex = stories.findIndex(
        (story) => story.userName === data.userName
      );

      if (storyIndex === -1) {
        dispatch(receiveCreateStory([data, ...stories]));
      } else {
        updateLocalStorage(data.userName);
        const currentStory = stories[storyIndex];
        currentStory.url = data.thumbnailUrl;
        currentStory.isWatched = false;
        dispatch(receiveCreateStory(stories));
      }
    } catch (e) {
      dispatch(errorCreateStory("Error: something went wrong"));
    }
  };
}
