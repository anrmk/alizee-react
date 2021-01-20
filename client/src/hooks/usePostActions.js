import { useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { POST_ROUTE } from "../constants/routes";
import ApiContext from "../context/ApiContext";

export default function usePostActions({ isFetching, onBuy, onPurchases, onReceipt, onFavorite, onLike }) {
  const history = useHistory();
  const apiClient = useContext(ApiContext);

  const handleBuy = useCallback(async ({ id }) => {
    !isFetching && (await onBuy(apiClient, id));
  }, []);

  const handlePurchases = useCallback(async (id) => {
    !isFetching && (await onPurchases(apiClient, id));
  }, []);

  const handleReceipt = useCallback(async (id) => {
    !isFetching && (await onReceipt(apiClient, id));
  });

  const handleLike = useCallback(async (id) => {
    !isFetching && (await onLike(apiClient, id));
  }, []);

  const handleFavorite = useCallback(async (id) => {
    !isFetching && (await onFavorite(apiClient, id));
  }, []);

  const handleGoTo = useCallback((id) => {
    history.push(`${POST_ROUTE}/${id}`);
  }, []);

  return {
    buyAction: handleBuy,
    purachasesAction: handlePurchases,
    receiptAction: handleReceipt,
    likeAction: handleLike,
    favoriteAction: handleFavorite,
    goToAction: handleGoTo,
  };
}
