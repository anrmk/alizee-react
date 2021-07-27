import { generateUrl } from "../../../helpers/functions";

export const GET_STORY_SLIDE_REQUEST = "GET_STORY_SLIDE_REQUEST";
export const GET_STORY_SLIDE_SUCCESS = "GET_STORY_SLIDE_SUCCESS";
export const GET_STORY_SLIDE_FAILURE = "GET_STORY_SLIDE_FAILURE";

function requestGetStorySlide() {
  return {
    type: GET_STORY_SLIDE_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveGetStorySlide(post) {
  return {
    type: GET_STORY_SLIDE_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      currentStory: post,
    },
  };
}

function errorGetStorySlide(message) {
  return {
    type: GET_STORY_SLIDE_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function getStorySlide(api, id) {
  return async (dispatch) => {
    dispatch(requestGetStorySlide());

    const url = generateUrl("getStorySlide");
    try {
      const { data } = await api.setMethod("GET").setParams({ id }).query(url);

      dispatch(receiveGetStorySlide(data));
    } catch {
      dispatch(errorGetStorySlide("Error: something went wrong"));
    }
  };
}
