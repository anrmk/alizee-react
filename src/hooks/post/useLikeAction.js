import { useContext, useCallback } from "react";
import { useDispatch } from "react-redux";

import ApiContext from "../../context/ApiContext";
import * as postActions from "../../store/actions/post";

export default function useLikeAction() {
  const apiClient = useContext(ApiContext);

  const dispatch = useDispatch();

  const handleLike = useCallback(
    async (id) => {
      await dispatch(postActions.likePost(apiClient, id));
    },
    []
  );

  return {
    toggle: handleLike,
  };
}
