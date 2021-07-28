import React from "react";

export const initialContext = {
  stories: [],
  muted: false,
};

export const UPDATE_STORY_DATA = "UPDATE_STORY_DATA";

const StoriesContext = React.createContext(initialContext);

export default StoriesContext;
