// POST_MENU_DIALOG_TYPE
import { useCallback } from "react";

import dialogs, { POST_MENU_DIALOG_TYPE } from "../../constants/dialogs";

import useDialog from "../useDialog";
import useSharePostDialog from "./useSharePostDialog";
import useReportDialog from "./useReportDialog";

export default function useMenuDialog() {
  const dialog = useDialog();

  const reportDialog = useReportDialog();
  const postShareDialog = useSharePostDialog();

  const handleDialogToggle = useCallback(async (data) => {
    dialog.toggleWithStack(
      dialogs[POST_MENU_DIALOG_TYPE](null, {
        onReport: reportDialog.toggle,
        onShareClick: postShareDialog.toggle,
        ...data,
      }),
      true
    );
  }, []);

  return {
    toggle: handleDialogToggle,
  };
}
