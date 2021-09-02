import { generateUrl, getProfileSnapshot } from "../../../helpers/functions";
import { updateAvatar } from ".";
import { updateCover } from "./updateCover";
import { IDLE, SUCCESS, FAILURE } from "../../../constants/request_status";

export const UPDATE_PROFILE_REQUEST = "UPDATE_PROFILE_REQUEST";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAILURE = "UPDATE_PROFILE_FAILURE";
export const UPDATE_PROFILE_RESET = "UPDATE_PROFILE_RESET";

function requestUpdateProfile() {
  return {
    type: UPDATE_PROFILE_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
      requestStatus: IDLE,
    },
  };
}

function receiveUpdateProfile(data) {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      userInfo: data || {},
      requestStatus: SUCCESS,
    },
  };
}

function errorUpdateProfile(message) {
  return {
    type: UPDATE_PROFILE_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
      requestStatus: FAILURE,
    },
  };
}

function resetUpdateProfile() {
  return {
    type: UPDATE_PROFILE_RESET,
    payload: {
      isFetching: false,
      errorMessage: "",
    },
  };
}

export function updateProfile(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestUpdateProfile());

    try {
      const signInState = getState().signIn;
      const currentAvatarUrl = signInState?.userInfo?.avatarUrl;
      const currentCoverUrl = signInState?.userInfo?.coverUrl;

      if (currentAvatarUrl !== opts.avatarUrl) {
        delete opts.avatarUrl;
        await dispatch(updateAvatar(api, { file: opts.avatarFile }));
      }

      if (currentCoverUrl !== opts.coverUrl) {
        delete opts.coverUrl;
        await dispatch(updateCover(api, { file: opts.coverFile }));
      }

      const previousData = getProfileSnapshot(signInState?.userInfo);
      const currentData = getProfileSnapshot(opts);

      if (previousData !== currentData) {
        const url = generateUrl("updateProfile");
        await api.setMethod("PUT").setData(opts).query(url);

        dispatch(receiveUpdateProfile({ ...signInState?.userInfo, ...opts }));
      } else {
        dispatch(resetUpdateProfile());
      }
    } catch (e) {
      dispatch(errorUpdateProfile("Error: something went wrong:", e));
    }
  };
}
