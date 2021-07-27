import { useContext, useCallback } from "react";

import StoriesContext, { UPDATE_STORY_DATA } from "../components/Stories/Context/StoriesContext"

export default function useStoriesControls() {
  const { setStoriesOptions } = useContext(StoriesContext);

  const muteAudio = useCallback((mute) => {
    setStoriesOptions({
      type: UPDATE_STORY_DATA,
      payload: { muted: mute }
    });
  }, [])

  return { muteAudio };
}

