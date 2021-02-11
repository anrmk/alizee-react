import React, { useEffect, useReducer } from "react";

import StoriesContext, { initialContext, UPDATE_STORY_DATA } from "./Context/StoriesContext";
import GlobalContext from "./Context/GlobalContext";
import Container from "./Container";

export default function({
  stories = [],
  ...rest
}) {
  const [storyOptions, setStoriesOptions] = useReducer((state, action) => {
    switch (action.type) {
      case UPDATE_STORY_DATA:
        return {
          ...state,
          ...action.payload
        };
      default:
        return state;
    }
  }, initialContext);

  useEffect(() => {
    if (stories) {
      setStoriesOptions({
        type: UPDATE_STORY_DATA,
        payload: { stories }
      });
    }
  }, [stories]);

  return (
    <GlobalContext.Provider value={{ ...rest }}>
      <StoriesContext.Provider value={{ storyOptions, setStoriesOptions }}>
        {storyOptions.stories && storyOptions.stories.length > 1 && <Container />}
      </StoriesContext.Provider>
    </GlobalContext.Provider>
  );
}
