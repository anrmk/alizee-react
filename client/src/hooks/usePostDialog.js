import { useContext, useCallback } from "react";

import ApiContext from "../context/ApiContext";
import dialogs, { CREATE_POST_DIALOG_TYPE } from "../constants/dialogs";
import useDialog from "./useDialog";

const FORM_ID = "create-post-form";

export default function usePostDialog({ isFetching, onPostCreate }) {
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();

  const handlePostCreate = useCallback(
    async (data) => {
      dialog.toggle({ open: false });
      !isFetching && (await onPostCreate(apiClient, data));
    },
    [onPostCreate]
  );

  const handleDialogToggle = useCallback(async (data) => {
    dialog.toggle(dialogs[CREATE_POST_DIALOG_TYPE]({ 
      mainBtnProps: { type: "submit", form: FORM_ID },
      tempData: data 
    }, { 
      formId: FORM_ID,
      onSubmit: handlePostCreate,
      ...data 
    }));
  }, [handlePostCreate]);

  return {
    toggle: handleDialogToggle,
  };
}