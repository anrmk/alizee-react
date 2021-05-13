import React, { useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import ApiContext from "../../context/ApiContext";
import dialogs, { CREATE_POST_DIALOG_TYPE, CONFIRM_DIALOG_TYPE } from "../../constants/dialogs";
import * as postActions from "../../store/actions/post";
import useDialog from "../useDialog";
import { useHistory, useLocation } from "react-router";

import { HOME_ROUTE, SETTINGS_BANK_ROUTE } from "../../constants/routes";
import { Link } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const FORM_ID = "create-post-form";

export default function usePostDialog() {
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();
  const { isFetching, identityVerified } = useSelector((state) => ({
    isFetching: state.posts.isFetching,
    identityVerified: state.signIn.userInfo.identityVerified,
  }));

  const handlePostCreate = useCallback(
    async (data) => {
      dialog.setParams({ loading: true });
      !isFetching && (await dispatch(postActions.createPost(apiClient, data)));
      dialog.toggle({ open: false, loading: false });
      location.pathname !== HOME_ROUTE && history.push(HOME_ROUTE);
    },
    [location]
  );

  const handleDialogToggle = useCallback(
    async (data) => {
      if (identityVerified) {
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
    [handlePostCreate]
  );

  return {
    toggle: handleDialogToggle,
  };
}
