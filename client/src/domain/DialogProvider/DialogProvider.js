import React, { useReducer } from "react";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  CircularProgress,
  IconButton,
  useMediaQuery
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";

import BackIcon from "@material-ui/icons/ArrowBackRounded";

import DialogContext, {
  initialContext,
  TOGGLE_WITH_STACK_MODAL,
  UPDATE_MODAL,
  TOGGLE_MODAL,
} from "../../context/DialogContext";

export default function DialogProvider({ children }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [dialogOptions, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case UPDATE_MODAL:
        return {
          ...state,
          ...action.payload,
        };
      case TOGGLE_MODAL:
        return {
          ...state,
          ...action.payload,
        };
      case TOGGLE_WITH_STACK_MODAL:
        const { stack } = state;
        return {
          ...state,
          ...action.payload,
          stack: [...stack, action.payload],
        };
      default:
        return state;
    }
  }, initialContext);

  const handleCloseClick = () => {
    dispatch({
      type: UPDATE_MODAL,
      payload: { open: false },
    });
    dialogOptions.onCloseClick && dialogOptions.onCloseClick();
  };

  const handleMainClick = () => {
    dialogOptions.onMainClick && dialogOptions.onMainClick(dialogOptions.tempData);
  };

  const handleBackClick = () => {
    const { stack } = dialogOptions;
    if (!stack.length) return;
    const prevDialogData = stack[stack.length - 2];

    dispatch({
      type: UPDATE_MODAL,
      payload: {
        ...prevDialogData,
        stack: stack.slice(0, stack.length - 1),
      },
    });
  };

  return (
    <DialogContext.Provider value={{ dialogOptions, setData: dispatch }}>
      {children}

      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        fullScreen={fullScreen}
        aria-labelledby="dialog-title"
        open={dialogOptions.open}
        onClose={handleCloseClick}
        {...dialogOptions.dialogProps}
      >
        {dialogOptions.title && (
          <DialogTitle id="dialog-title">
            {dialogOptions.stack.length > 1 && (
              <IconButton onClick={handleBackClick}>
                <BackIcon />
              </IconButton>
            )}
            {dialogOptions.title}
          </DialogTitle>
        )}

        {dialogOptions.content && (
          <DialogContent id="dialog-content">
            {dialogOptions.loading ? <CircularProgress /> : dialogOptions.content}
          </DialogContent>
        )}

        {!dialogOptions.actionsComponent
          ? (dialogOptions.onCloseClick || dialogOptions.onMainClick) && (
              <DialogActions>
                {(dialogOptions.onMainClick || dialogOptions.mainBtnProps) && (
                  <Button disabled={dialogOptions.loading} {...dialogOptions.mainBtnProps} onClick={handleMainClick}>
                    {dialogOptions.mainBtnText}
                  </Button>
                )}
                {(dialogOptions.onCloseClick || dialogOptions.closeBtnProps) && (
                  <Button disabled={dialogOptions.loading} {...dialogOptions.closeBtnProps} onClick={handleCloseClick}>
                    {dialogOptions.closeBtnText}
                  </Button>
                )}
              </DialogActions>
            )
          : dialogOptions.actionsComponent}
      </Dialog>
    </DialogContext.Provider>
  );
}
