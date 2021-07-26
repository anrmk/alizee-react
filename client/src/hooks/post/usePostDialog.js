import React, { useState, useContext, useCallback, useRef } from "react";
import { useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import ApiContext from "../../context/ApiContext";
import dialogs, { CREATE_POST_DIALOG_TYPE, CONFIRM_DIALOG_TYPE } from "../../constants/dialogs";
import * as postActions from "../../store/actions/post";
import useDialog from "../useDialog";

import { HOME_ROUTE, SETTINGS_BANK_ROUTE } from "../../constants/routes";
import { isSameObjects } from "../../helpers/functions";
import useUsersDialog from "../useUsersDialog";

const FORM_ID = "create-post-form";

export default function usePostDialog() {
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();
  const history = useHistory();
  const location = useLocation();

  const [dialogBaseProps] = useState({
    mainBtnProps: { title: "Tag People",type: "submit", form: FORM_ID },
  });
  let formData = useRef().current;

  const dispatch = useDispatch();
  const { isFetching, identityVerified } = useSelector((state) => ({
    isFetching: state.followingPosts.isFetching,
    identityVerified: state.signIn.userInfo.identityVerified,
  }));
  const usersDialog = useUsersDialog();

  const handlePostCreate = useCallback(async (data) => {
    dialog.setParams({ loading: true });
    data.taggedUsers?.length && (data.userTags = data.taggedUsers.map(item => item.userName));

    !isFetching && (await dispatch(postActions.createPost(apiClient, data)));
    dialog.toggle({ open: false, loading: false });
    location.pathname !== HOME_ROUTE && history.push(HOME_ROUTE);
  }, [location, isFetching]);

  const handleTagUsersClick = useCallback((data) => {
    formData = data;
    usersDialog.toggle({
      title: "Tag People",
      mainBtnText: "Add",
      onMainClick: handleAddTaggedUsersClick,
      onBackClick: () => handleBackClick(formData.taggedUsers)
    }, {
      preSelected: data.taggedUsers?.map(item => item.userName)
    }, 
    true);
  }, []);

  const handleAddTaggedUsersClick = useCallback((data, e) => {
    e.preventDefault();
    handleBackClick(data);
  }, [])

  const handleBackClick = useCallback((currentTaggedUsernames) => {
    let newTaggedUsers = formData?.taggedUsers;

    if (!isSameObjects(currentTaggedUsernames, newTaggedUsers)) {
      newTaggedUsers = currentTaggedUsernames;
    }

    dialog.back(
      dialogs[CREATE_POST_DIALOG_TYPE](
        dialogBaseProps,
        {
          ...formData,
          formId: FORM_ID,
          taggedUsers: newTaggedUsers,
          onSubmit: handlePostCreate,
          onTagUsersClick: handleTagUsersClick
        })
    );
  }, []);

  const handleDialogToggle = useCallback(
    async (data) => {
      if (identityVerified) {
        dialog.toggleWithStack(
          dialogs[CREATE_POST_DIALOG_TYPE](
            {
              ...dialogBaseProps,
              onMainClick: null
            },
            {
              formId: FORM_ID,
              onSubmit: handlePostCreate,
              onTagUsersClick: handleTagUsersClick
            })
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
    [handlePostCreate, identityVerified]
  );

  return {
    toggle: handleDialogToggle,
  };
}
