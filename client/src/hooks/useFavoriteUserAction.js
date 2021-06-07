import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ApiContext from "../context/ApiContext";
import * as accountActions from "../store/actions/account";

export default function useFavoriteUserAction() {
  const apiClient = useContext(ApiContext);

  const dispatch = useDispatch();
  const { isFetching, isFavorite } = useSelector((state) => ({
    isFetching: state.user.isFetching,
    isFavorite: state.user.data?.isFavorite,
  }));

  const handleFavoriteUser = async ({ userName }) => {
    if (!isFetching) {
      isFavorite ? 
        await dispatch(accountActions.deleteFavorites(apiClient, userName)) : 
        await dispatch(accountActions.createFavorites(apiClient, userName));
    }
  }

  return {
    favoriteUserAction: handleFavoriteUser
  };
}
