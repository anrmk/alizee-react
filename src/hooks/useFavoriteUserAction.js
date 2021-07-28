import { useContext, useCallback } from "react";
import { useDispatch } from "react-redux";

import ApiContext from "../context/ApiContext";
import * as accountActions from "../store/actions/account";

export default function useFavoriteUserAction() {
  const apiClient = useContext(ApiContext);

  const dispatch = useDispatch();

  const handleFavoriteUser = useCallback(async ({ userName, isFavorite }) => {
    isFavorite
      ? await dispatch(accountActions.deleteFavorites(apiClient, userName))
      : await dispatch(accountActions.createFavorites(apiClient, userName));
  }, []);

  return {
    favoriteUserAction: handleFavoriteUser,
  };
}
