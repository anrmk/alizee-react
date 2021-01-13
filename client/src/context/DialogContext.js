import React from "react";

export const UPDATE_BODY_MODAL = "UPDATE_BODY_MODAL";
export const TOGGLE_BODY_MODAL = "TOGGLE_BODY_MODAL";

export const initialContext = {
	open: false,
	title: null,
	content: null,
	actionsComponent: null,
	bodyComponent: null,
	dialogProps: null,

	onModalHide: undefined
};

const DialogContext = React.createContext(initialContext);

export default DialogContext;
