import { useCallback } from "react";
import { useHistory, useLocation } from "react-router";

import dialogs, { POST_MENU_DIALOG_TYPE } from "../../constants/dialogs";

import useDialog from "../useDialog";
import useSharePostDialog from "./useSharePostDialog";
import useReportDialog from "./useReportDialog";
import useBlockDialog from "../useBlockDialog";
import useDeleteAction from "./useDeleteAction";
import useShareDialog, { SHARE_DIALOG_PROFILE_TYPE } from "../useShareDialog";
import { DEFAULT_ROUTE } from "../../constants/routes";
import { POST_TYPE } from "../../components/Post/Menu";

const initProps = {
  isBlock: true,
  isReport: true,
  isShare: true,
  isChatShare: false,
  isDelete: true,
  type: POST_TYPE
};

export default function useMenuDialog(props) {
  props = { ...initProps, ...props };
  const history = useHistory();
  const location = useLocation();
  const dialog = useDialog();
  const blockDialog = useBlockDialog();
  const reportDialog = useReportDialog();
  const postShareDialog = useSharePostDialog();
  const chatShareDialog = useShareDialog({ withStack: true, type: SHARE_DIALOG_PROFILE_TYPE });
  const { deletePostAction } = useDeleteAction();

  const handleDeleteClick = useCallback(async (id) => {
    dialog.setParams({ loading: true });
    await deletePostAction(id);
    dialog.toggle({ open: false, loading: false });

    if (location.pathname !== DEFAULT_ROUTE) {
      history.push(DEFAULT_ROUTE);
    }
  }, []);

  const handleDialogToggle = useCallback(async (data) => {
    dialog.toggleWithStack(
      dialogs[POST_MENU_DIALOG_TYPE](null, {
        onBlock: props.isBlock && blockDialog.toggle,
        onReport: props.isReport && reportDialog.toggle,
        onShare: props.isShare && postShareDialog.toggle,
        onChatShare: props.isChatShare && chatShareDialog.toggle,
        onDelete: props.isDelete && handleDeleteClick,
        type: props.type,
        ...data
      }),
      true
    );
  }, []);

  return {
    toggle: handleDialogToggle,
  };
}
