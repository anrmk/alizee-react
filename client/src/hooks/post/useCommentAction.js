import { useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import ApiContext from "../../context/ApiContext";
import * as commentActions from "../../store/actions/comment";

export default function useCommentAction() {
  const apiClient = useContext(ApiContext);

  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => ({
    isFetching: state.comment.isFetching
  }));

  const handleCommentSendClick = useCallback(async ({ postId, message }) => {
    !isFetching && 
      await dispatch(commentActions.createCommentPost(apiClient, { postId, message }));
  }, []);

  return {
    handleCommentSendClick
  };
}
