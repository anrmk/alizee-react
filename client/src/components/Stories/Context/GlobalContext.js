import React from "react";

export const initialContext = {
	defaultInterval: 4000
};

const GlobalContext = React.createContext(initialContext);

export default GlobalContext;
