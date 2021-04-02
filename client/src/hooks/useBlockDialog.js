import { useContext, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import ApiContext from "../context/ApiContext";
import dialogs, { BLOCK_DIALOG_TYPE } from "../constants/dialogs";
import * as relationshipActions from "../store/actions/relationship";

import useDialog from "./useDialog";

const FORM_ID = "dialog-blockUser";

export default function useBlockDialog() {
  const apiClient = useContext(ApiContext);
  const dialog = useDialog();
  const dispatch = useDispatch();
  
  const handleBlockUser = useCallback(async ({ userName, blockType }) => {
    dialog.toggle({ open: false });
    await dispatch(relationshipActions.createBlock(apiClient, userName, blockType));
  }, []);

  const handleDialogToggle = useCallback(async (data) => {
    dialog.toggle(
      dialogs[BLOCK_DIALOG_TYPE](
        {
          mainBtnProps: { type: "submit", form: FORM_ID },
        },
        {
          formId: FORM_ID,
          onSubmit: handleBlockUser,
          ...data,
        }
      )
    );
  }, []);

  return {
    toggle: handleDialogToggle,
  };
}
