import { useCallback } from "react";
import { useHistory, useLocation } from "react-router";

import dialogs, { POST_MENU_DIALOG_TYPE } from "../../constants/dialogs";

import useDialog from "../useDialog";
import useSharePostDialog from "./useSharePostDialog";
import useReportDialog from "./useReportDialog";
import useBlockDialog from "../useBlockDialog";
import useDeleteAction from "./useDeleteAction";
import { DEFAULT_ROUTE } from "../../constants/routes";

export default function useMenuDialog() {
  const history = useHistory();
  const location = useLocation();
  const dialog = useDialog();
  const blockDialog = useBlockDialog();
  const reportDialog = useReportDialog();
  const postShareDialog = useSharePostDialog();
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
        onBlock: blockDialog.toggle,
        onReport: reportDialog.toggle,
        onShare: postShareDialog.toggle,
        onDelete: handleDeleteClick,
        ...data
      }),
      true
    );
  }, []);

  return {
    toggle: handleDialogToggle,
  };
}
