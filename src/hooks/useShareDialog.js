import { useContext, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";

import ApiContext from "../context/ApiContext";
import * as actionChat from "../store/actions/chat";
import { getUrlTo } from "../helpers/functions";
import { POST_MESSAGE_TYPE, STORY_MESSAGE_TYPE, PROFILE_MESSAGE_TYPE } from "../constants/message_types";
import { POST_ID_ROUTE, PROFILE_USERNAME_ROUTE, STORIES_ROUTE } from "../constants/routes";
import useDialog from "./useDialog";
import useUsersDialog from "./useUsersDialog";

export const SHARE_DIALOG_STORY_TYPE = "story";
export const SHARE_DIALOG_PROFILE_TYPE = "profile";
export const SHARE_DIALOG_POST_TYPE = "post";

export default function useShareDialog({
  withStack = false,
  type,
}) {
  const apiClient = useContext(ApiContext);
  const dispatch = useDispatch();
  const dialog = useDialog();
  const usersDialog = useUsersDialog();
  let currentShareId = useRef(null).current;
  let currentShareUsername = useRef(null).current;

  const handleOpenClick = useCallback(async (data) => {
    const { id, userName } = data;

    usersDialog.toggle(
        {
          title: "Share To Chat",
          mainBtnText: "Share",
          onMainClick: handleShareDialogBtnClick
        },
        null,
        withStack
    );

    currentShareId = id;
    currentShareUsername = userName;
  }, []);

  const handleShareDialogBtnClick = useCallback(async (items) => {
    if ((!items.length && !currentShareId) || (!items.length && !currentShareUsername)) return;

    const followersUsernames = items.map(item => item.userName);
    let url = "";
    let messageType = "";

    if (type === SHARE_DIALOG_STORY_TYPE) {
      url = getUrlTo(STORIES_ROUTE(currentShareId, currentShareUsername));
      messageType = STORY_MESSAGE_TYPE;
    } else if (type === SHARE_DIALOG_PROFILE_TYPE) {
      url = getUrlTo(PROFILE_USERNAME_ROUTE(currentShareUsername));
      messageType = PROFILE_MESSAGE_TYPE;
    } else if (type === SHARE_DIALOG_POST_TYPE) {
      url = getUrlTo(POST_ID_ROUTE(currentShareId));
      messageType = POST_MESSAGE_TYPE;
    } else return;

    dialog.setParams({ loading: true });
    await dispatch(actionChat.shareMessage(apiClient, {
      followersUsernames,
      message: url,
      type: messageType
    }));
    dialog.toggle({ open: false, loading: false });
  }, []);

  return {
    toggle: handleOpenClick
  };
}
