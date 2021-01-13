import React, { useReducer } from "react";

import DialogContext, { initialContext, UPDATE_BODY_MODAL, TOGGLE_BODY_MODAL } from "../../context/DialogContext";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";

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

  const renderTitle = (title) => {
    if (typeof title === "string") {
      return <DialogTitle id="post-dialog-title">{title}</DialogTitle>
    }

    return title;
  }

  const renderContent = (content) => {
    if (typeof content === "string") {
      return <DialogContent id="post-dialog-content">{content}</DialogContent>
    }

    return content;
  }

  return (
    <DialogContext.Provider value={dispatch}>
      {children}

      <Dialog
        aria-labelledby="post-dialog-title"
        open={dialogOptions.open}
        onClose={dialogOptions.onModalHide}
        {...dialogOptions.dialogProps}>
        {dialogOptions.title && <DialogTitle id="post-dialog-title">{dialogOptions.title}</DialogTitle>}
        {dialogOptions.content && <DialogContent id="post-dialog-title">{dialogOptions.content}</DialogContent>}
        {/* {renderTitle(dialogOptions.title)}
        {renderContent(dialogOptions.content)} */}
        {dialogOptions.actionsComponent}
        {dialogOptions.bodyComponent}
      </Dialog>
    </DialogContext.Provider>
  );
};
