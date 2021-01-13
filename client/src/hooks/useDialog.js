import React, { useEffect, useContext } from "react";

import DialogContext, { UPDATE_BODY_MODAL, TOGGLE_BODY_MODAL } from "../context/DialogContext";

export default function useDialog(props) {
  const dispatch = useContext(DialogContext);

  useEffect(() => {
    setParams(props);
  }, [props]);
  
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

  return { 
    setParams,
    toggleDialog
  }
};
