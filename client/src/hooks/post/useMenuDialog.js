import { useCallback } from "react";

import dialogs, { POST_MENU_DIALOG_TYPE } from "../../constants/dialogs";

import useDialog from "../useDialog";
import useSharePostDialog from "./useSharePostDialog";
import useReportDialog from "./useReportDialog";
import useBlockDialog from "../useBlockDialog";

export default function useMenuDialog() {
  const dialog = useDialog();

  const blockDialog = useBlockDialog();
  const reportDialog = useReportDialog();
  const postShareDialog = useSharePostDialog();

  const handleDialogToggle = useCallback(async (data) => {
    dialog.toggleWithStack(
      dialogs[POST_MENU_DIALOG_TYPE](null, {
        onBlock: blockDialog.toggle,
        onReport: reportDialog.toggle,
        onShare: postShareDialog.toggle,
        ...data,
      }),
      true
    );
  }, []);

  return {
    toggle: handleDialogToggle,
  };
}
