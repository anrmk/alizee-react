import { useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import ApiContext from "../../context/ApiContext";
import * as commentActions from "../../store/actions/comment";
import useDialog from "../useDialog";
import dialogs, { AGREE_DIALOG_TYPE } from "../../constants/dialogs";

export default function useCommentDialog() {
  const apiClient = useContext(ApiContext);
  const { t } = useTranslation();
  const dialog = useDialog();

  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => ({
    isFetching: state.comment.isFetching
  }));

  const handleDeleteConfirmClick = useCallback(async ({ commentId }) => {
    dialog.setParams({ loading: true });
    !isFetching && await dispatch(commentActions.deleteComment(apiClient, commentId));
    dialog.toggle({ open: false, loading: false });
  }, []);

  const handleDialogToggle = useCallback(async (commentId) => {
    dialog.toggle(dialogs[AGREE_DIALOG_TYPE]({
      title: t("DeleteCommentDialogTitle"),
      onMainClick: handleDeleteConfirmClick,
      state: { commentId }
    }, {
      content: t("DeleteCommentDialogDescription")
    }));
  }, []);

  return {
    toggle: handleDialogToggle
  };
}
