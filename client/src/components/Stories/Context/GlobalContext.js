import React from "react";

export const initialContext = {
	defaultInterval: 4000,
	onMoreClick: null,
	onCloseClick: null
};

const GlobalContext = React.createContext(initialContext);

export default GlobalContext;
