import React from "react";

export const initialContext = {
  defaultInterval: 4000,
  currentIndex: 0,
  onMoreClick: null,
  onCloseClick: null,
  onPrevious: null,
  onStoryEnd: null,
  onStoryStart: null,
  onAllStoriesEnd: null,
};

const GlobalContext = React.createContext(initialContext);

export default GlobalContext;
