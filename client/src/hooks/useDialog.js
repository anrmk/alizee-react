import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import DialogContext, { initialContext, UPDATE_BODY_MODAL, TOGGLE_BODY_MODAL } from "../context/DialogContext";

export default function useDialog() {
  const { pathname } = useLocation();
  const { dialogOptions, setData } = useContext(DialogContext);

  useEffect(() => {
    resetDialog();
  }, [pathname]);

  const setParams = React.useCallback((data) => {
    setData({
      type: UPDATE_BODY_MODAL,
      payload: data
    });
  }, [setData]);

  const toggle = React.useCallback(({ open = !dialogOptions.open, ...rest }) => {
    resetDialog();
    setData({
      type: TOGGLE_BODY_MODAL,
      payload: { open, ...rest }
    });
  }, [setData]);

  const resetDialog = React.useCallback(() => {
    setParams(initialContext);
  }, [setData]);

  return {
    setParams,
    toggle,
    resetDialog,
    dialogOptions
  }
};
