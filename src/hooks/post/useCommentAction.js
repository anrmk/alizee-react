import { useContext, useCallback } from "react";
import { useDispatch } from "react-redux";

import ApiContext from "../../context/ApiContext";
import * as commentActions from "../../store/actions/comment";

export default function useCommentAction() {
  const apiClient = useContext(ApiContext);

  const dispatch = useDispatch();

  const handleCommentSendClick = useCallback(async ({ postId, text }) => {
    await dispatch(
      commentActions.createCommentPost(apiClient, { postId, text })
    );
  }, []);

  return {
    handleCommentSendClick,
  };
}
