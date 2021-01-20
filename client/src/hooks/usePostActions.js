import { useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { POST_ROUTE } from "../constants/routes";
import ApiContext from "../context/ApiContext";
import usePostDialog, { PURCHASES_DIALOG_TYPE, RECEIPT_DIALOG_TYPE } from "../hooks/usePostDialog";

export default function usePostActions({ isFetching, onBuy, onPurchases, onReceipt, onFavorite, onLike }) {
  const history = useHistory();
  const apiClient = useContext(ApiContext);
  const postDialog = usePostDialog({ onPayClick: handleBuy });

  async function handleBuy({ id }) {
    !isFetching && (await onBuy(apiClient, id));
  }

  const handleLike = useCallback(async (id) => {
    !isFetching && (await onLike(apiClient, id));
  }, []);

  const handleFavorite = useCallback(async (id) => {
    !isFetching && (await onFavorite(apiClient, id));
  }, []);

  const handleGoTo = useCallback((id) => {
    history.push(`${POST_ROUTE}/${id}`);
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
    likeAction: handleLike,
    favoriteAction: handleFavorite,
    goToAction: handleGoTo,
    dialogToggleAction: handleDialogToggle,
  };
}
