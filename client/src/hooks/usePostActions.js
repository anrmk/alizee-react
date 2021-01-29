import { useContext, useCallback } from "react";

import ApiContext from "../context/ApiContext";
import usePostDialog, { PURCHASES_DIALOG_TYPE, RECEIPT_DIALOG_TYPE } from "../hooks/usePostDialog";

export default function usePostActions({ isFetching, onBuy, onPurchases, onReceipt, onFavorite, onLike, onSendTip }) {
  const apiClient = useContext(ApiContext);
  const postDialog = usePostDialog({ onPayClick: handleBuy, onSendTip: handleSendTip });

  async function handleBuy({ id }) {
    !isFetching && (await onBuy(apiClient, id));
  }

  async function handleSendTip({id, user, amount, message}) {
    !isFetching && (await onSendTip(apiClient, user.userName, amount, message))
  }

  const handleLike = useCallback(async (id) => {
    !isFetching && (await onLike(apiClient, id));
  }, []);

  const handleFavorite = useCallback(async (id) => {
    !isFetching && (await onFavorite(apiClient, id));
  }, []);

  const handleDialogToggle = async (data, type) => {
    switch (type) {
      case RECEIPT_DIALOG_TYPE: {
        !isFetching &&
          (await onReceipt(apiClient, data.id, (d) => {
            postDialog.toggleDialog(type, true, d );
          }));
        break;
      }
      case PURCHASES_DIALOG_TYPE: {
        !isFetching &&
          (await onPurchases(apiClient, data.id, (d) => {
            postDialog.toggleDialog(type, true, { purchases: d });
          }));
        break;
      }
      default:
        postDialog.toggleDialog(type, true, data);
    }
  };

  return {
    like: handleLike,
    favorite: handleFavorite,
    dialogToggleAction: handleDialogToggle,
  };
}
