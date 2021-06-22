import { useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import ApiContext from "../../context/ApiContext";
import * as postActions from "../../store/actions/post";

export default function useFavoriteAction() {
  const apiClient = useContext(ApiContext);

  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => ({
    isFetching: state.followingPosts.isFetching,
  }));

  const handleFavorite = useCallback(async (id) => {
    !isFetching && (await dispatch(postActions.favoritePost(apiClient, id)));
  }, [isFetching])

  return {
    toggle: handleFavorite,
  };
}
