import { React, useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import useDialog from "../useDialog";
import useConfirmationDialog from "../useConfirmationDialog";

import ApiContext from "../../context/ApiContext";
import * as postActions from "../../store/actions/post";

import ConfirmDialog from "../../components/DialogForms/ConfirmDialog";

import { DEFAULT_ROUTE } from "../../constants/routes";

export default function useHideDialog() {
  const history = useHistory();
  const location = useLocation();
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();
  const confirmationDialog = useConfirmationDialog();

  const { isFetching } = useSelector((state) => ({
    isFetching: state.followingPosts.isFetching,
  }));

  const dispatch = useDispatch();

  const handleHideConfirm = useCallback(async ({ postId }) => {
    dialog.setParams({ loading: true });
    !isFetching && (await dispatch(postActions.hidePost(apiClient, postId)));
    dialog.toggle({ open: false, loading: false });
    if (location.pathname !== DEFAULT_ROUTE) {
      history.push(DEFAULT_ROUTE);
    }
  }, []);

  const handleHideClick = useCallback(async (id) => {
    confirmationDialog.toggle(
      {
        mainBtnText: "Confirm",
        title: "Hide post",
        state: id,
        onMainClick: handleHideConfirm,
      },
      {
        contentText: (
          <ConfirmDialog
            helpText="If you hide this post, you can not see one again. Do you really want to hide the post?"
            textProp={{ variant: "subtitle1", align: "center" }}
          />
        ),
      },
      true
    );
  }, []);

  return {
    toggle: handleHideClick,
  };
}
