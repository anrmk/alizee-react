import { useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import ApiContext from "../../context/ApiContext";
import dialogs, { CREATE_POST_DIALOG_TYPE } from "../../constants/dialogs";
import * as postActions from "../../store/actions/post";
import useDialog from "../useDialog";

const FORM_ID = "create-post-form";

export default function usePostDialog() {
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();

  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => ({
    isFetching: state.posts.isFetching,
  }));

  const handlePostCreate = useCallback(async (data) => {
    dialog.toggle({ open: false });
    !isFetching && (await dispatch(postActions.createPost(apiClient, data)));
  }, []);

  const handleDialogToggle = useCallback(
    async (data) => {
      dialog.toggle(
        dialogs[CREATE_POST_DIALOG_TYPE](
          {
            mainBtnProps: { type: "submit", form: FORM_ID },
          },
          {
            formId: FORM_ID,
            onSubmit: handlePostCreate,
            ...data,
          }
        )
      );
    },
    [handlePostCreate]
  );

  return {
    toggle: handleDialogToggle,
  };
}
