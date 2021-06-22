import { useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import ApiContext from "../../context/ApiContext";
import * as postActions from "../../store/actions/post";

export default function useLikeAction() {
  const apiClient = useContext(ApiContext);

  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => ({
    isFetching: state.followingPosts.isFetching,
  }));

  const handleLike = useCallback(
    async (id) => {
      !isFetching && (await dispatch(postActions.likePost(apiClient, id)));
    },
    [isFetching]
  );

  return {
    toggle: handleLike,
  };
}
