import { useContext, useCallback } from "react";

import ApiContext from "../../context/ApiContext";
import dialogs, { PURCHASES_DIALOG_TYPE } from "../../constants/dialogs";
import useDialog from "../useDialog";

export default function usePurchaseDialog({ isFetching, onPurchases }) {
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();

  const handleDialogToggle = useCallback(
    async (id) => {
      !isFetching &&
        (await onPurchases(apiClient, id, (data) => {
          dialog.toggle(
            dialogs[PURCHASES_DIALOG_TYPE](null, { purchases: data })
          );
        }));
    },
    [onPurchases]
  );

  return {
    toggle: handleDialogToggle,
  };
}
