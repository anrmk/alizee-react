import React, { useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import ApiContext from "../../context/ApiContext";
import dialogs, {
  CREATE_STORY_DIALOG_TYPE,
  CONFIRM_DIALOG_TYPE,
} from "../../constants/dialogs";
import * as storyActions from "../../store/actions/story";
import useDialog from "../useDialog";

import { SETTINGS_BANK_ROUTE } from "../../constants/routes";
import { STORIES_LENGTH } from "../../constants/feed";

const FORM_ID = "create-story-form";

export default function useStoryDialog() {
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();

  const dispatch = useDispatch();
  const { isFetching, identityVerified } = useSelector((state) => ({
    isFetching: state.story.isFetching,
    identityVerified: state.signIn.userInfo.identityVerified,
  }));

  const handleStoryCreate = useCallback(
    async (data) => {
      dialog.setParams({ loading: true });
      !isFetching &&
        (await dispatch(storyActions.createStorySlide(apiClient, data)));
      !isFetching &&
        (await dispatch(
          storyActions.getFollowingStories(apiClient, {
            start: 0,
            length: STORIES_LENGTH,
          })
        ));
      dialog.toggle({ open: false, loading: false });
    },
    [isFetching]
  );

  const handleDialogToggle = useCallback(
    async (data) => {
      if (identityVerified) {
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
                You are unable to post any more content until you have uploaded
                a photo ID. To upload a photo ID, please click{" "}
                <Link href={SETTINGS_BANK_ROUTE}>here</Link>
              </Alert>
            ),
            ...data,
          })
        );
      }
    },
    [handleStoryCreate, identityVerified]
  );

  return {
    toggle: handleDialogToggle,
  };
}
