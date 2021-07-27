import { useContext, useCallback } from "react";
import { useDispatch } from "react-redux";

import ApiContext from "../../context/ApiContext";
import * as postActions from "../../store/actions/post";

export default function useFavoriteAction() {
  const apiClient = useContext(ApiContext);

  const dispatch = useDispatch();

  const handleFavorite = useCallback(async (id) => {
    await dispatch(postActions.favoritePost(apiClient, id));
  }, [])

  return {
    toggle: handleFavorite,
  };
}
