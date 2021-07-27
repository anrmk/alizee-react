import { useContext, useCallback } from "react";

import ApiContext from "../../context/ApiContext";
import dialogs, { RECEIPT_DIALOG_TYPE } from "../../constants/dialogs";
import useDialog from "../useDialog";

export default function useReceiptDialog({ isFetching, onReceipt }) {
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();

  const handleDialogToggle = useCallback(
    async (id) => {
      !isFetching &&
        (await onReceipt(apiClient, id, (data) => {
          dialog.toggle(dialogs[RECEIPT_DIALOG_TYPE](null, data));
        }));
    },
    [onReceipt]
  );

  return {
    toggle: handleDialogToggle,
  };
}
