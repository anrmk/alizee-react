import { useContext, useCallback } from "react";

import { CREATE_POST_DIALOG_TYPE, CREATE_STORY_DIALOG_TYPE, CREATE_MOOD_DIALOG_TYPE } from "../constants/dialogs";
import dialogs from "../constants/dialogs";
import ApiContext from "../context/ApiContext";
import useDialog from "../hooks/useDialog";

const FORM_ID = "create-form";

export default function usePostSproutDialog(props) {
  const { onCreatePost, onCreateStory, onCreateMood } = props;
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();

  const handleSubmit = useCallback(async (type, formData) => {
    dialog.toggle({ open: false });
    switch (type) {
      case CREATE_POST_DIALOG_TYPE: {
        onCreatePost && await onCreatePost(apiClient, formData);
        break;
      }
      case CREATE_STORY_DIALOG_TYPE: {
        onCreateStory && await onCreateStory(apiClient, formData);
        break;
      }
      case CREATE_MOOD_DIALOG_TYPE: {
        onCreateMood && await onCreateMood(apiClient, formData);
        break;
      }
    }
  }, [onCreatePost, onCreateStory, onCreateMood]);

  const handleDialogToggle = useCallback(async (type) => {
    dialog.toggle(dialogs[type]({
      mainBtnProps: { type: "submit", form: FORM_ID },
    }, {
      formId: FORM_ID,
      onSubmit: handleSubmit
    }));
  }, [handleSubmit]);

  return { dialogToggleSprout: handleDialogToggle };
}
