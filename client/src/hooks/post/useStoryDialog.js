import { useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import ApiContext from "../../context/ApiContext";
import dialogs, { CREATE_STORY_DIALOG_TYPE } from "../../constants/dialogs";
import * as storyActions from "../../store/actions/story";
import useDialog from "../useDialog";

const FORM_ID = "create-story-form";

export default function useStoryDialog() {
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();

  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => ({
    isFetching: state.story.isFetching,
  }));

  const handleStoryCreate = useCallback(async (data) => {
    dialog.toggle({ open: false });
    !isFetching && (await dispatch(storyActions.createStorySlide(apiClient, data)));
  }, []);

  const handleDialogToggle = useCallback(
    async (data) => {
      dialog.toggle(
        dialogs[CREATE_STORY_DIALOG_TYPE](
          {
            mainBtnProps: { type: "submit", form: FORM_ID },
          },
          {
            formId: FORM_ID,
            onSubmit: handleStoryCreate,
            ...data,
          }
        )
      );
    },
    [handleStoryCreate]
  );

  return {
    toggle: handleDialogToggle,
  };
}
