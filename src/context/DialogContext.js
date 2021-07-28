import React from "react";

export const UPDATE_MODAL = "UPDATE_MODAL";
export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const TOGGLE_WITH_STACK_MODAL = "TOGGLE_WITH_STACK_MODAL";
export const STACK_BACK = "STACK_BACK";
export const UPDATE_MODAL_CONTENT = "UPDATE_MODAL_CONTENT";

export const initialContext = {
  open: false,
  title: null,
  content: null,
  actionsComponent: null,
  state: null,
  loading: false,
  dialogProps: null,
  mainBtnProps: null,
  mainBtnText: "OK",
  closeBtnProps: null,
  closeBtnText: "Close",
  stack: [],
  asModal: false,

  onCloseClick: null,
  onMainClick: null,
  onBackClick: null,
};

const DialogContext = React.createContext(initialContext);

export default DialogContext;
