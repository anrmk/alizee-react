import { useContext, useCallback } from "react";

import ApiContext from "../context/ApiContext";
import { POST_TYPE } from "../constants/feed";

export default function useSprout(props) {
  const apiClient = useContext(ApiContext);
  const { createPost, createStory, createMood } = props;

  const handleFormSubmit = useCallback(
    async (formData, mediaData) => {
      switch (formData.type) {
        case POST_TYPE.STORY: {
          await createStory(apiClient, formData, mediaData);
          break;
        }
        case POST_TYPE.MOOD: {
          await createMood(apiClient, formData);
          break;
        }
        case POST_TYPE.POST: {
          await createPost(apiClient, formData, mediaData);
          break;
        }
        default:
          return;
      }
    },
    [props]
  );

  return { onSproutSubmit: handleFormSubmit };
}
