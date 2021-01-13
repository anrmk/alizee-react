import React, { useState, useEffect } from "react";
import { DialogActions, Button } from "@material-ui/core";

import useDialog from "../hooks/useDialog";
import { Payment, Receipt } from "../components/Post";
import SocialList from "../domain/SocialList";

export const PAYMENT_DIALOG_TYPE = "payment";
export const SHARE_DIALOG_TYPE = "share";
export const RECEIPT_DIALOG_TYPE = "receipt";

export default function usePostDialog({
  onPayClick
}) {
  const dialogs = {
    [PAYMENT_DIALOG_TYPE]: {
      title: "Payment",
      content: <Payment />,
      actionsComponent: (
        <DialogActions>
          <Button color="primary" onClick={handlePayClick}>Pay</Button>
          <Button onClick={() => dialog.toggleDialog(false)}>Close</Button>
        </DialogActions>
      )
    },
    [SHARE_DIALOG_TYPE]: {
      title: "Share post",
      content: <SocialList />,
      actionsComponent: (
        <DialogActions>
          <Button onClick={() => dialog.toggleDialog(false)}>Close</Button>
        </DialogActions>
      )
    },
    [RECEIPT_DIALOG_TYPE]: {
      title: "Receipt",
      content: <Receipt />,
      actionsComponent: (
        <DialogActions>
          <Button onClick={() => dialog.toggleDialog(false)}>Close</Button>
        </DialogActions>
      )
    },
  };

  const [currentDialog, setCurrentDialog] = useState({ type: PAYMENT_DIALOG_TYPE, data: {} });
  const dialog = useDialog({
    ...dialogs[currentDialog.type],
    dialogProps: { fullWidth: true }
  });

  useEffect(() => dialog.setParams(dialog[currentDialog]), [onPayClick]);

  const toggleDialog = (type, state, data) => { 
    setCurrentDialog({ type, data });
    dialog.toggleDialog(state);
  }

  function handlePayClick() {
    dialog.toggleDialog(false);
    onPayClick && onPayClick(currentDialog.data);
  }

  return { toggleDialog };
};
