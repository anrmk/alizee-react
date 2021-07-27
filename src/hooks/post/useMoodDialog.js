import { useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import ApiContext from "../../context/ApiContext";
import dialogs, { CREATE_MOOD_DIALOG_TYPE } from "../../constants/dialogs";
import * as moodAction from "../../store/actions/mood";
import useDialog from "../useDialog";

const FORM_ID = "create-mood-form";

export default function useMoodDialog() {
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();

  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => ({
    isFetching: state.story.isFetching,
  }));

  const handleMoodCreate = useCallback(
    async (data) => {
      dialog.toggle({ open: false });
      !isFetching && (await dispatch(moodAction.createMood(apiClient, data)));
    },
    []
  );

  const handleDialogToggle = useCallback(async (data) => {
    dialog.toggle(dialogs[CREATE_MOOD_DIALOG_TYPE]({ 
      mainBtnProps: { type: "submit", form: FORM_ID }
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