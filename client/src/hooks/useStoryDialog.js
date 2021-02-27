import { useContext, useCallback } from "react";

import ApiContext from "../context/ApiContext";
import dialogs, { CREATE_STORY_DIALOG_TYPE } from "../constants/dialogs";
import useDialog from "./useDialog";

const FORM_ID = "create-story-form";

export default function useStoryDialog({ isFetching, onStoryCreate }) {
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();

  const handleStoryCreate = useCallback(
    async (data) => {
      dialog.toggle({ open: false });
      !isFetching && (await onStoryCreate(apiClient, data));
    },
    [onStoryCreate]
  );

  const handleDialogToggle = useCallback(async (data) => {
    dialog.toggle(dialogs[CREATE_STORY_DIALOG_TYPE]({ 
      mainBtnProps: { type: "submit", form: FORM_ID },
      tempData: data 
    }, { 
      formId: FORM_ID,
      onSubmit: handleStoryCreate,
      ...data 
    }));
  }, [handleStoryCreate]);

  return {
    toggle: handleDialogToggle,
  };
}