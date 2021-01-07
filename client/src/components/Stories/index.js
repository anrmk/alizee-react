import React from "react";

import StoriesContext from "./Context/StoriesContext";
import GlobalContext from "./Context/GlobalContext";
import Container from "./Container";

export default function({
  stories,
  ...rest
}) {
  return (
    <GlobalContext.Provider value={{ ...rest }}>
      <StoriesContext.Provider value={{ stories }}>
        {stories && stories.length && <Container />}
      </StoriesContext.Provider>
    </GlobalContext.Provider>
  );
}
