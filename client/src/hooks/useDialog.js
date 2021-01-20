import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import DialogContext, { initialContext, UPDATE_BODY_MODAL, TOGGLE_BODY_MODAL } from "../context/DialogContext";

export default function useDialog(props) {
  const { pathname } = useLocation();
  const dispatch = useContext(DialogContext);

  useEffect(() => {
    setParams(props);
  }, [props]);

   useEffect(() => {
    resetDialog();
   }, [pathname]);

  const setParams = React.useCallback((data) => {
    dispatch({
      type: UPDATE_BODY_MODAL,
      payload: data
    });
  }, [dispatch]);

  const toggleDialog = React.useCallback((open) => {
    dispatch({
      type: TOGGLE_BODY_MODAL,
      payload: { open }
    });
  }, [dispatch]);

  const resetDialog = React.useCallback(() => {
    setParams(initialContext)
  }, [dispatch]);

  return { 
    setParams,
    toggleDialog,
    resetDialog
  }
};
