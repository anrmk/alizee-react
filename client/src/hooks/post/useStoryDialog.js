import React, { useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import ApiContext from "../../context/ApiContext";
import dialogs, { CREATE_STORY_DIALOG_TYPE, CONFIRM_DIALOG_TYPE } from "../../constants/dialogs";
import * as storyActions from "../../store/actions/story";
import useDialog from "../useDialog";

import { SETTINGS_BANK_ROUTE } from "../../constants/routes";
import { Link } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const FORM_ID = "create-story-form";

export default function useStoryDialog() {
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();

  const dispatch = useDispatch();
  const { isFetching, identityVerified} = useSelector((state) => ({
    isFetching: state.story.isFetching,
    identityVerified: state.signIn.userInfo.identityVerified,
  }));

  const handleStoryCreate = useCallback(async (data) => {
    dialog.toggle({ open: false });
    !isFetching && (await dispatch(storyActions.createStorySlide(apiClient, data)));
  }, []);

  const handleDialogToggle = useCallback(
    async (data) => {
      if(identityVerified) {
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
      } else {
        dialog.toggle(
          dialogs[CONFIRM_DIALOG_TYPE](null, {
            contentText: (
              <Alert severity="warning">
                You are unable to post any more content until you have uploaded a photo ID. To upload a photo ID, please
                click <Link href={SETTINGS_BANK_ROUTE}>here</Link>
              </Alert>
            ),
            ...data,
          })
        );
      }
    },
    [handleStoryCreate]
  );

  return {
    toggle: handleDialogToggle,
  };
}
