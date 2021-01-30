import React, { useReducer } from "react";

import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from "@material-ui/core";

import DialogContext, { initialContext, UPDATE_BODY_MODAL, TOGGLE_BODY_MODAL } from "../../context/DialogContext";

export default function DialogProvider({ children }) {
  const [dialogOptions, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case UPDATE_BODY_MODAL:
        return {
          ...state,
          ...action.payload
        };
      case TOGGLE_BODY_MODAL:
        return {
          ...state,
          ...action.payload
        };
      default:
        return state;
    }
  }, initialContext);

  const handleCloseClick = () => {
    dispatch({
      type: UPDATE_BODY_MODAL,
      payload: { open: false }
    });
    dialogOptions.onCloseClick && dialogOptions.onCloseClick();
  }

  const handleMainClick = () => {
    dialogOptions.onMainClick && dialogOptions.onMainClick(dialogOptions.tempData);
  }

  return (
    <DialogContext.Provider value={{ dialogOptions, setData: dispatch }}>
      {children}

      <Dialog
        aria-labelledby="dialog-title"
        open={dialogOptions.open}
        onClose={handleCloseClick}
        {...dialogOptions.dialogProps}>
        {dialogOptions.title && <DialogTitle id="dialog-title">{dialogOptions.title}</DialogTitle>}

        {dialogOptions.content && <DialogContent id="dialog-content">{dialogOptions.content}</DialogContent>}

        {!dialogOptions.actionsComponent ?
          (dialogOptions.onCloseClick || dialogOptions.onMainClick) && (
            <DialogActions>
              {(dialogOptions.onMainClick || dialogOptions.mainBtnProps) &&
                <Button {...dialogOptions.mainBtnProps} onClick={handleMainClick}>{dialogOptions.mainBtnText}</Button>}
              {(dialogOptions.onCloseClick || dialogOptions.closeBtnProps) &&
                <Button {...dialogOptions.closeBtnProps} onClick={handleCloseClick}>{dialogOptions.closeBtnText}</Button>}
            </DialogActions>
          )
          : dialogOptions.actionsComponent
        }
      </Dialog>
    </DialogContext.Provider>
  );
};
