import { useContext, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import ApiContext from "../../context/ApiContext";
import dialogs, { CREATE_POST_DIALOG_TYPE } from "../../constants/dialogs";
import * as postActions from "../../store/actions/post";
import useDialog from "../useDialog";
import { useHistory, useLocation } from "react-router";
import { HOME_ROUTE } from "../../constants/routes";

const FORM_ID = "create-post-form";

export default function usePostDialog() {
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => ({
    isFetching: state.posts.isFetching,
  }));

  const handlePostCreate = useCallback(async (data) => {
    dialog.setParams({ loading: true });
    !isFetching && (await dispatch(postActions.createPost(apiClient, data)));
    dialog.toggle({ open: false, loading: false });
    location.pathname !== HOME_ROUTE && history.push(HOME_ROUTE);
  }, [location]);

  const handleDialogToggle = useCallback(
    async (data) => {
      dialog.toggle(
        dialogs[CREATE_POST_DIALOG_TYPE](
          {
            mainBtnProps: { type: "submit", form: FORM_ID }
          },
          {
            formId: FORM_ID,
            onSubmit: handlePostCreate,
            ...data,
          }
        )
      );
    },
    [handlePostCreate]
  );

  return {
    toggle: handleDialogToggle,
  };
}
