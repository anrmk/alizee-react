import React from "react";
import { DialogContentText } from "@material-ui/core";

function ResetPasswordDialog() {
  return (
    <DialogContentText>
      You will receive a password reset email for the account. If your email
      address can&apos;t be found when trying to reset your password, you may
      have registered with a different email or mistyped your email when you
      first signed up.
    </DialogContentText>
  );
}

export default ResetPasswordDialog;
