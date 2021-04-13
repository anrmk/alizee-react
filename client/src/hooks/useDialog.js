import React, { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import DialogContext, {
  initialContext,
  TOGGLE_WITH_STACK_MODAL,
  UPDATE_MODAL,
  TOGGLE_MODAL,
} from "../context/DialogContext";

export default function useDialog() {
  const { pathname } = useLocation();
  const { dialogOptions, setData } = useContext(DialogContext);
  const { open: gOpen, stack } = dialogOptions;

  useEffect(() => {
    reset();
  }, [pathname]);

  useEffect(() => {
    setParams();
  }, [stack]);

  const setParams = React.useCallback(
    (data) => {
      setData({
        type: UPDATE_MODAL,
        payload: data,
      });
    },
    [setData]
  );

  const baseToggle = React.useCallback(
    (opts, type) => {
      setData({
        type: type,
        payload: {
          open: !gOpen ? !gOpen : gOpen,
          ...opts
        },
      });
    },
    [setData, gOpen]
  );

  const reset = () => {
    setParams(initialContext);
  };

  const toggle = (opts) => {
    reset();
    baseToggle(opts, TOGGLE_MODAL);
  };

  const toggleWithStack = (opts, clearStack = false) => {
    if (clearStack) {
      reset();
    }
    baseToggle(opts, TOGGLE_WITH_STACK_MODAL);
  };

  return {
    setParams,
    toggle,
    toggleWithStack,
    reset,
    stack,
    dialogOptions,
  };
}
