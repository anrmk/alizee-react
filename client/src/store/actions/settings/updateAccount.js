import { MEDIA_AVATAR } from '../../../constants/media_types';
import { generateUrl, generateFileUrl, getAccountSnapshot } from '../../../helpers/functions';
import { createMedia } from '../media';
import { updateUsername } from './updateUsername';

export const UPDATE_ACCOUNT_REQUEST = 'UPDATE_ACCOUNT_REQUEST';
export const UPDATE_ACCOUNT_SUCCESS = 'UPDATE_ACCOUNT_SUCCESS';
export const UPDATE_ACCOUNT_FAILURE = 'UPDATE_ACCOUNT_FAILURE';

function requestUpdateAccount() {
  return {
    type: UPDATE_ACCOUNT_REQUEST,
    payload: {
      isFetching: true,
      errorMessage: '',
    }
  }
}

function receiveUpdateAccount(data) {
  return {
    type: UPDATE_ACCOUNT_SUCCESS,
    payload: {
      isFetching: false,
      errorMessage: '',
      userInfo: data || {}
    }
  }
}

function errorUpdateAccount(message) {
  return {
    type: UPDATE_ACCOUNT_FAILURE,
    payload: {
      isFetching: false,
      errorMessage: message
    }
  }
}

export function updateAccount(api, opts) {
  return async (dispatch, getState) => {
    dispatch(requestUpdateAccount());

    try {
      const signInState = getState().signIn;
      const currentAvatarUrl = signInState?.userInfo.avatarUrl;
      if (opts.avatarUrl && currentAvatarUrl !== opts.avatarUrl) {
        await dispatch(createMedia(api, [opts.avatarFile], MEDIA_AVATAR));

        const mediaErrorMessage = getState().media.errorMessage;
        if (mediaErrorMessage) {
          throw mediaErrorMessage;
        }

        const media = getState().media.data;
        if (media.length) {
          opts.avatarUrl = media[0]?.url;
        }
      }

      const currentUsername = signInState?.userInfo.userName;
      if (opts.username && currentUsername !== opts.username) {
        await dispatch(updateUsername(api, opts.username));

        const signInError = signInState.errorMessage;

        if (signInError) {
          throw signInError;
        }
      }

      const previousData = getAccountSnapshot(signInState?.userInfo);
      const currentData = getAccountSnapshot(opts);

      if (previousData !== currentData) {
        const url = generateUrl('updateAccount');
        const { data } = await api
          .setMethod('PUT')
          .setData({
            name: opts.fullName,
            birthday: opts.birthday || undefined,
            phoneNumber: opts.phone || undefined,
            avatarUrl: opts.avatarUrl || undefined,
            bio: opts.bio || undefined,
            sites: opts.sites 
          })
          .query(url);

        opts.avatarUrl = generateFileUrl(process.env.REACT_APP_DOMAIN, data.avatarUrl);

        const oldUserInfo = signInState?.userInfo;
        const updatedData =  {
          name: opts.fullName,
          userName: opts.username,
          birthday: opts.birthday,
          phoneNumber: opts.phone,
          avatarUrl: opts.avatarUrl,
          bio: opts.bio,
          sites: opts.sites
        }

        dispatch(receiveUpdateAccount({ ...oldUserInfo, ...updatedData }));
      }
    } catch (e) {
      dispatch(errorUpdateAccount("Error: something went wrong:", e));
    }
  }
}
