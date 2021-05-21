import { useState, useContext } from "react";
import { useDispatch } from "react-redux";

import ApiContext from "../context/ApiContext";
import * as actionChat from "../store/actions/chat";
import { getUrlTo } from "../helpers/functions";
import { POST_MESSAGE_TYPE, STORY_MESSAGE_TYPE, PROFILE_MESSAGE_TYPE } from "../constants/message_types";
import { POST_ID_ROUTE, PROFILE_USERNAME_ROUTE, STORIES_ROUTE } from "../constants/routes";
import useDialog from "./useDialog";
import useFollowingsDialog from "./useFollowingsDialog";

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
  const [currentShareId, setCurrentShareId] = useState(null);
  const [currentShareUsername, setCurrentShareUsername] = useState(null);
  const [toggleType] = useState(withStack ? "toggleWithStack" : "toggle");
  const followingsDialog = useFollowingsDialog();

  const handleOpenClick = async ({ id, userName }) => {
    followingsDialog.toggle(toggleType, {
      onMainClick: handleShareDialogBtnClick
    });

    id && setCurrentShareId(id);
    userName && setCurrentShareUsername(userName);
  }

  const handleShareDialogBtnClick = async (items) => {
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

    await dispatch(actionChat.shareMessage(apiClient, {
      followersUsernames,
      message: url,
      type: messageType
    }));
    dialog[toggleType]({ open: false });
  }

  return {
    toggle: handleOpenClick
  };
}
