import { generateUrl, getAccountSnapshot } from "../../../helpers/functions";
import { updateAvatar } from "../user";
import { updateCover } from "./updateCover";
import { updateUsername } from "./updateUsername";

export const UPDATE_ACCOUNT_REQUEST = "UPDATE_ACCOUNT_REQUEST";
export const UPDATE_ACCOUNT_SUCCESS = "UPDATE_ACCOUNT_SUCCESS";
export const UPDATE_ACCOUNT_FAILURE = "UPDATE_ACCOUNT_FAILURE";
export const UPDATE_ACCOUNT_RESET = "UPDATE_ACCOUNT_RESET";

function requestUpdateAccount() {
  return {
    type: UPDATE_ACCOUNT_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: "",
    },
  };
}

function receiveUpdateAccount(data) {
  return {
    type: UPDATE_ACCOUNT_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: "",
      userInfo: data || {},
    },
  };
}

function errorUpdateAccount(message) {
  return {
    type: UPDATE_ACCOUNT_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message,
    },
  };
}

function resetUpdateAccount() {
  return {
    type: UPDATE_ACCOUNT_RESET,
    payload: {
      isFetching: false,
      errorMessage: "",
    },
  };
}

export function updateAccount(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestUpdateAccount());

    try {
      const signInState = getState().signIn;
      const currentAvatarUrl = signInState?.userInfo?.avatarUrl;
      const currentCoverUrl = signInState?.userInfo?.coverUrl;

      if (currentAvatarUrl !== opts.avatarUrl) {
        await dispatch(updateAvatar(api, { file: opts.avatarFile }));
      }

      if (currentCoverUrl !== opts.coverUrl) {
        await dispatch(updateCover(api, { file: opts.coverFile }));
      }

      const currentUsername = signInState?.userInfo.userName;
      if (opts.userName && currentUsername !== opts.userName) {
        await dispatch(updateUsername(api, opts.userName));

        const signInError = signInState.errorMessage;

        if (signInError) {
          throw signInError;
        }
      }

      const previousData = getAccountSnapshot(signInState?.userInfo);
      const currentData = getAccountSnapshot(opts);

      if (previousData !== currentData) {
        const url = generateUrl("updateAccount");
        await api
          .setMethod("PUT")
          .setData({
            name: opts.name,
            birthday: opts.birthday || undefined,
            phoneNumber: opts.phoneNumber || undefined,
            bio: opts.bio || undefined,
            sites: opts.sites,
          })
          .query(url);

        const oldUserInfo = signInState?.userInfo;
        const updatedData = {
          name: opts.name,
          userName: opts.userName,
          birthday: opts.birthday,
          phoneNumber: opts.phone,
          bio: opts.bio,
          sites: opts.sites,
        };

        dispatch(receiveUpdateAccount({ ...oldUserInfo, ...updatedData }));
      } else {
        dispatch(resetUpdateAccount());
      }
    } catch (e) {
      dispatch(errorUpdateAccount("Error: something went wrong:", e));
    }
  };
}
