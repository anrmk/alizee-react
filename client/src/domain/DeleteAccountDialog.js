import React from "react";
import { DialogContentText } from "@material-ui/core";

function DeleteAccountDialog() {
  return (
    <DialogContentText>
      This account will be blocked for six months, and you can restore it at any time. After six months, your
      account will be permanently deleted.
    </DialogContentText>
  )
}

export default DeleteAccountDialog;
