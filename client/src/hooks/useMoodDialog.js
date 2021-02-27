import { useContext, useCallback } from "react";

import ApiContext from "../context/ApiContext";
import dialogs, { CREATE_MOOD_DIALOG_TYPE } from "../constants/dialogs";
import useDialog from "./useDialog";

const FORM_ID = "create-mood-form";

export default function useMoodDialog({ isFetching, onMoodCreate }) {
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();

  const handleMoodCreate = useCallback(
    async (data) => {
      dialog.toggle({ open: false });
      !isFetching && (await onMoodCreate(apiClient, data));
    },
    [onMoodCreate]
  );

  const handleDialogToggle = useCallback(async (data) => {
    dialog.toggle(dialogs[CREATE_MOOD_DIALOG_TYPE]({ 
      mainBtnProps: { type: "submit", form: FORM_ID },
      tempData: data 
    }, { 
      formId: FORM_ID,
      onSubmit: handleMoodCreate,
      ...data 
    }));
  }, [handleMoodCreate]);

  return {
    toggle: handleDialogToggle,
  };
}