import { useContext, useCallback } from "react";
import { useDispatch } from "react-redux";

import ApiContext from "../../context/ApiContext";
import * as postActions from "../../store/actions/post";

import dialogs, { REPORT_POST_DIALOG_TYPE } from "../../constants/dialogs";
import useDialog from "../useDialog";

const FORM_ID = "report-post-form";

export default function useReportDialog() {
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();
  const dispatch = useDispatch();

  const handleReportPost = useCallback(async (data) => {
    dialog.toggle({ open: false });
    await dispatch(postActions.reportPost(apiClient, data));
  }, []);

  const handleDialogToggle = useCallback(async (data) => {
    dialog.toggleWithStack(
      dialogs[REPORT_POST_DIALOG_TYPE](
        {
          mainBtnProps: { type: "submit", form: FORM_ID },
        },
        {
          formId: FORM_ID,
          onReport: handleReportPost,
          ...data,
        }
      )
    );
  }, []);

  return {
    toggle: handleDialogToggle,
  };
}
