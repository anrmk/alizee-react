import { useEffect, useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import ApiContext from "../../context/ApiContext";
import useDialog from "../useDialog";
import dialogs, { CHAT_NEW_TYPE } from "../../constants/dialogs";
import * as actionChat from "../../store/actions/chat";
import * as actionRelationship from "../../store/actions/relationship";

export default function useNewChatDialog() {
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();

  const { data, userName } = useSelector((state) => ({
    userName: state.signIn?.userInfo?.userName,
    data: actionRelationship.getFilteredFollowings(state)
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dialog.setParams(
        dialogs[CHAT_NEW_TYPE]({
          loading: false,
          },
          {
            items: data,
            onItemClick: handleRoomCreate,
            onSearchChange: handleFollowingsFilter,
          }
        )
      );
    }
  }, [data]);

  const handleFollowingsFilter = (value) => {
    dispatch(actionRelationship.filterFollowings(value));
  };

  const handleRoomCreate = async (userName) => {
    await dispatch(actionChat.createRoom(apiClient, userName));
    dialog.toggle({ open: false });
  };

  const handleDialogToggle = useCallback(async () => {
    dialog.toggle(dialogs[CHAT_NEW_TYPE]({ loading: true }));
    await dispatch(actionRelationship.getFollowings(apiClient, userName));
  }, []);

  return {
    toggle: handleDialogToggle,
  };
}
