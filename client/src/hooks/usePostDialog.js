import React, { useState, useEffect } from "react";
import { DialogActions, Button } from "@material-ui/core";

import useDialog from "../hooks/useDialog";
import { Payment, Receipt, Purchase } from "../components/Post";
import { SendTip } from "../components/Tip";
import SocialList from "../domain/SocialList";

export const PAYMENT_DIALOG_TYPE = "payment";
export const SHARE_DIALOG_TYPE = "share";
export const RECEIPT_DIALOG_TYPE = "receipt";
export const PURCHASES_DIALOG_TYPE = "purchases";
export const SEND_TIP_DIALOG_TYPE = "tip";

export default function usePostDialog({ onPayClick, onSendTip }) {
  const [currentDialog, setCurrentDialog] = useState({ type: PAYMENT_DIALOG_TYPE, data: {} });

  const dialogs = {
    [PAYMENT_DIALOG_TYPE]: {
      title: "Payment",
      content: <Payment {...currentDialog.data} />,
      actionsComponent: (
        <DialogActions>
          <Button color="primary" onClick={() => handlePayClick()}>
            Pay
          </Button>
          <Button onClick={() => handleCloseBtnClick()}>Close</Button>
        </DialogActions>
      ),
    },
    [SHARE_DIALOG_TYPE]: {
      title: "Share post",
      content: <SocialList {...currentDialog.data} />,
      actionsComponent: (
        <DialogActions>
          <Button onClick={() => handleCloseBtnClick()}>Close</Button>
        </DialogActions>
      ),
    },
    [RECEIPT_DIALOG_TYPE]: {
      title: "Receipt",
      content: <Receipt {...currentDialog.data} />,
      actionsComponent: (
        <DialogActions>
          <Button onClick={() => handleCloseBtnClick()}>Close</Button>
        </DialogActions>
      ),
    },
    [PURCHASES_DIALOG_TYPE]: {
      title: "Purchases",
      content: <Purchase {...currentDialog.data} />,
      actionsComponent: (
        <DialogActions>
          <Button onClick={() => handleCloseBtnClick()}>Close</Button>
        </DialogActions>
      ),
    },
    [SEND_TIP_DIALOG_TYPE]: {
      title: "Send Tip",
      content: <SendTip {...currentDialog.data} id="formSendTip" onSubmit={handleSendTip} />,
      actionsComponent: (
        <DialogActions>
          <Button onClick={() => handleCloseBtnClick()}>Close</Button>
          <Button color="primary" form="formSendTip" type="submit">
            Send Tip
          </Button>
        </DialogActions>
      ),
    },
  };

  const dialog = useDialog({
    ...dialogs[currentDialog.type],
    dialogProps: { fullWidth: true, onClose: () => dialog.toggleDialog(false) },
  });

  useEffect(() => dialog.setParams(dialog[currentDialog]), [onPayClick, onSendTip]);

  const toggleDialog = (type, state, data) => {
    setCurrentDialog({ type, data });
    dialog.toggleDialog(state);
  };

  function handlePayClick() {
    handleCloseBtnClick(false);
    onPayClick && onPayClick(currentDialog.data);
  }

  function handleSendTip(formData) {
    handleCloseBtnClick(false);
    onSendTip && onSendTip({ ...currentDialog.data, ...formData });
  }

  function handleCloseBtnClick() {
    dialog.toggleDialog(false);
    dialog.resetDialog();
  }

  return { toggleDialog, currentDialog };
}
