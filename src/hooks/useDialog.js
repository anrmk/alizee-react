import React, { useEffect, useContext, useCallback } from "react";
import { useLocation } from "react-router-dom";

import DialogContext, {
  initialContext,
  TOGGLE_WITH_STACK_MODAL,
  UPDATE_MODAL,
  TOGGLE_MODAL,
  STACK_BACK,
  UPDATE_MODAL_CONTENT,
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

  const setParams = useCallback(
    (data) => {
      setData({
        type: UPDATE_MODAL,
        payload: data,
      });
    },
    [setData]
  );

  const setContent = useCallback((data) => {
    setData({
      type: UPDATE_MODAL_CONTENT,
      payload: data,
    });
  }, []);

  const baseToggle = React.useCallback(
    (opts, type) => {
      setData({
        type: type,
        payload: {
          open: !gOpen ? !gOpen : gOpen,
          ...opts,
        },
      });
    },
    [setData, gOpen]
  );

  const back = useCallback(
    (params) => {
      setData({ type: STACK_BACK });
      params && setParams(params);
    },
    [setData]
  );

  const reset = () => {
    setParams(initialContext);
  };

  const toggle = useCallback((opts) => {
    reset();
    baseToggle(opts, TOGGLE_MODAL);
  }, []);

  const toggleWithStack = useCallback((opts, clearStack = false) => {
    if (clearStack) {
      reset();
    }
    baseToggle(opts, TOGGLE_WITH_STACK_MODAL);
  }, []);

  return {
    setParams,
    setContent,
    toggle,
    toggleWithStack,
    reset,
    stack,
    back,
    dialogOptions,
  };
}
