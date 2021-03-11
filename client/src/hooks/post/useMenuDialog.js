// POST_MENU_DIALOG_TYPE
import { useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import ApiContext from "../../context/ApiContext";
import dialogs, { POST_MENU_DIALOG_TYPE } from "../../constants/dialogs";
import * as postActions from "../../store/actions/post";
import useDialog from "../useDialog";
import useSharePostDialog from "./useSharePostDialog";

export default function useMenuDialog() {
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();
  const postShareDialog = useSharePostDialog();

  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => ({
    isFetching: state.posts.isFetching,
  }));

  const handleMenuCreate = useCallback(async (data) => {
    dialog.toggle({ open: false });
    // !isFetching && (await dispatch(postActions.createMenu(apiClient, data)));
  }, []);

  const handleDialogToggle = useCallback(
    async (data) => {
      dialog.toggleWithStack(dialogs[POST_MENU_DIALOG_TYPE](null,
        {
          onShareClick: postShareDialog.toggle,
          ...data,
        }
      ), true);
    },
    []
  );

  return {
    toggle: handleDialogToggle,
  };
}
