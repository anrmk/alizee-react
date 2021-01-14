import { generateUrl } from "../../../helpers/functions";
import { updateMood } from "../user";

export const CREATE_MOOD_REQUEST = "CREATE_MOOD_REQUEST";
export const CREATE_MOOD_SUCCESS = "CREATE_MOOD_SUCCESS";
export const CREATE_MOOD_FAILURE = "CREATE_MOOD_FAILURE";

function requestCreateMood() {
  return {
    type: CREATE_MOOD_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveCreateMood(userInfo) {
  return {
    type: CREATE_MOOD_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      userInfo
    },
  };
}

function errorCreateMood(message) {
  return {
    type: CREATE_MOOD_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

export function createMood(api, postData) {
  return async (dispatch, getState) => {
    dispatch(requestCreateMood());

    try {
      const url = generateUrl("createMood");

      await api
        .setData({
          text: postData.text,
          latitude: postData?.latitude,
          longitude: postData?.longitude,
        })
        .query(url);

      const userInfo = getState().signIn?.userInfo;
      userInfo.mood = postData.text;

       const user = getState().user?.data;
       if(user && user.userName == userInfo.userName) {
        dispatch(updateMood(postData.text));
       }

      dispatch(receiveCreateMood(userInfo));
    } catch (e) {
      dispatch(errorCreateMood("Error: something went wrong"));
    }
  };
}
