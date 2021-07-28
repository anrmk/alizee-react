import { useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import ApiContext from "../../context/ApiContext";
import * as postActions from "../../store/actions/post";

export default function useDeleteAction() {
  const apiClient = useContext(ApiContext);

  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => ({
    isFetching: state.followingPosts.isFetching,
  }));

  const handleDeleteClick = useCallback(async ({ postId }) => {
    !isFetching && (await dispatch(postActions.deletePost(apiClient, postId)));
  }, []);

  return {
    deletePostAction: handleDeleteClick,
  };
}
