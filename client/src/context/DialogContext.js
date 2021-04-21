import React from "react";

export const UPDATE_MODAL = "UPDATE_MODAL";
export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const TOGGLE_WITH_STACK_MODAL = "TOGGLE_WITH_STACK_MODAL";

export const initialContext = {
	open: false,
	title: null,
	content: null,
	actionsComponent: null,
	tempData: null,
	loading: false,
	dialogProps: null,
	mainBtnProps: null,
	mainBtnText: "OK",
	closeBtnProps: null,
	closeBtnText: "Close",
	stack: [],
	asModal: false,

	onCloseClick: null,
	onMainClick: null
};

const DialogContext = React.createContext(initialContext);

export default DialogContext;
