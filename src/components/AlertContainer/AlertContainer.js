import React from "react";
import { Box, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const DEFAULT_HIDE_TIME = 2000;

function AlertContainer({
  className,
  children,
  alertOpen = false,
  autoHideDuration = DEFAULT_HIDE_TIME,
  successAlert,
  errorAlert,
  error,
  component: Component = Box,

  onAlertClose,
}) {
  const handleAlertClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }

    onAlertClose && onAlertClose();
  };

  return (
    <Component className={className}>
      {children}
      <Snackbar
        open={alertOpen}
        autoHideDuration={autoHideDuration}
        onClose={handleAlertClose}>
        <Alert
          elevation={6}
          variant="filled"
          severity={error ? "error" : "success"}>
          {error ? errorAlert : successAlert}
        </Alert>
      </Snackbar>
    </Component>
  );
}

export default AlertContainer;
