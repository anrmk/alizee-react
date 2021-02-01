import React from "react";

export const UPDATE_BODY_MODAL = "UPDATE_BODY_MODAL";
export const TOGGLE_BODY_MODAL = "TOGGLE_BODY_MODAL";

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

	onCloseClick: null,
	onMainClick: null
};

const DialogContext = React.createContext(initialContext);

export default DialogContext;
