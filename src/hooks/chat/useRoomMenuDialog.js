import { useCallback, useContext } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import ApiContext from "../../context/ApiContext";
import * as actionChat from "../../store/actions/chat";

import dialogs, { ROOM_MENU_DIALOG_TYPE } from "../../constants/dialogs";
import { CHAT_ROUTE } from "../../constants/routes";

import useDialog from "../useDialog";
import useBlockDialog from "../useBlockDialog";

export default function useRoomMenuDialog(callback) {
  const dialog = useDialog();
  const dispatch = useDispatch();
  const apiClient = useContext(ApiContext);
  const history = useHistory();

  const blockDialog = useBlockDialog();

  const handleDeleteRoom = useCallback(async (id) => {
    if (
      !window.confirm(
        "Delete chat?\nDeleting removes the chat from your inbox, but no one else's inbox."
      )
    ) {
      return;
    }

    dialog.toggle({ open: false });
    await dispatch(actionChat.deleteRoom(apiClient, id));
    history.replace(CHAT_ROUTE);
    callback && callback();
  }, []);

  const handlerClearChat = useCallback(async (id) => {
    if (!window.confirm("Clear chat?\nThis can not be undone!")) {
      return;
    }

    dialog.toggle({ open: false });
    await dispatch(actionChat.deleteRoomHistory(apiClient, id));
  }, []);

  const handleDialogToggle = useCallback(async (data) => {
    dialog.toggleWithStack(
      dialogs[ROOM_MENU_DIALOG_TYPE](null, {
        onBlockClick: blockDialog.toggle,
        onDeleteClick: handleDeleteRoom,
        onClearClick: handlerClearChat,
        ...data,
      }),
      true
    );
  }, []);

  return {
    toggle: handleDialogToggle,
  };
}
