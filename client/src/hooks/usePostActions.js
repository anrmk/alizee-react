import { useContext, useCallback } from "react";

import ApiContext from "../context/ApiContext";
import dialogs, { PURCHASES_DIALOG_TYPE, RECEIPT_DIALOG_TYPE } from "../constants/dialogs";
import useDialog from "./useDialog";

export default function usePostActions({ isFetching, onBuy, onPurchases, onReceipt, onFavorite, onLike }) {
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();

  const handleBuy = useCallback(async ({id}) => {
    dialog.toggle({ open: false });
    !isFetching && (await onBuy(apiClient, id));
  }, [onBuy]);

  const handleLike = useCallback(async (id) => {
    !isFetching && (await onLike(apiClient, id));
  }, [onLike]);

  const handleFavorite = useCallback(async (id) => {
    !isFetching && (await onFavorite(apiClient, id));
  }, [onFavorite]);

  const handleDialogToggle = useCallback(async (type, data) => {
    switch (type) {
      case RECEIPT_DIALOG_TYPE: {
        !isFetching &&
          // TODO: remove callback function and make sequentially calls (add loader to dialog content if data still there is not)
          (await onReceipt(apiClient, data.id, (d) => {
            dialog.toggle(dialogs[type](null, d));
          }));
        break;
      }
      case PURCHASES_DIALOG_TYPE: {
        !isFetching &&
          // TODO: remove callback function and make sequentially calls (add loader to dialog content if data still there is not)
          (await onPurchases(apiClient, data.id, (d) => {
            dialog.toggle(dialogs[type](null, { purchases: d }));
          }));
        break;
      }
      default:
        dialog.toggle(dialogs[type](null, data));
    }
  }, []);

  return {
    like: handleLike,
    favorite: handleFavorite,
    dialogToggleAction: handleDialogToggle,
  };
}
