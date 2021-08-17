/* eslint-disable no-debugger */
import { useState, useEffect } from "react";

export default function useStoriesSwitcher({
  data,
  slideId,
  storyId,
  onUpdatePath,
}) {
  const [currentSlideId, setCurrentSlideId] = useState(slideId);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [localSlides, setLocalSlides] = useState([]);

  useEffect(() => {
    if (data?.length) {
      if (slideId) {
        const index = data.findIndex(
          (item) => !!item.slides.find((slide) => slide.id === slideId)
        );
        if (index !== -1) {
          setupStory(data[index]?.slides, data[index]?.user, 0, index);
        }
      } else if (storyId) {
        const index = data.findIndex((item) => item.userId === storyId);
        if (index !== -1) {
          setupStory(data[index]?.slides, data[index]?.user, 0, index);
        }
      } else {
        setupStory(data[0]?.slides, data[0]?.user, 0, 0);
      }
    } else if (data?.slides?.length) {
      const index = data.slides.findIndex((item) => item.id === slideId);
      setupStory(
        data.slides,
        data.userName,
        data.name,
        data.avatarUrl,
        index !== -1 ? index : 0
      );
    }
  }, [data]);

  const setupStory = (
    items,
    userName,
    name,
    avatarUrl,
    slideIndex = 0,
    storyIndex = 0
  ) => {
    if (!items?.length) return;
    debugger;

    const lSlideId = items[slideIndex].id;

    items && setLocalSlides(items);
    userName && setCurrentUser(userName);
    setCurrentStoryIndex(storyIndex);
    setCurrentSlideIndex(slideIndex);
    setCurrentSlideId(lSlideId);

    onUpdatePath && onUpdatePath(userName, lSlideId);
  };

  const changeStory = (pStoryIndex, next = false) => {
    if (
      (!next && pStoryIndex >= 0) ||
      (next && pStoryIndex <= data?.length - 1)
    ) {
      const userInfo = data[pStoryIndex]?.user;
      let slideIndex = 0;

      !next && (slideIndex = data[pStoryIndex]?.slides?.length - 1);

      setupStory(data[pStoryIndex]?.slides, userInfo, slideIndex, pStoryIndex);
    }
  };

  const handleSlideChange = (slides, userInfo, pSlideIndex) => {
    if (slides.length && userInfo) {
      setupStory(slides, userInfo, pSlideIndex, currentStoryIndex);
    }
  };

  const handleNextStory = () => {
    if (data.length) {
      const nextStoryIndex = currentStoryIndex + 1;
      changeStory(nextStoryIndex, true);
    }
  };

  const handlePreviousStory = () => {
    if (data.length) {
      const previousStoryIndex = currentStoryIndex - 1;
      changeStory(previousStoryIndex);
    }
  };

  return {
    currentSlideId,
    currentSlideIndex,
    localSlides,
    currentUser,
    handlePreviousStory,
    handleNextStory,
    handleSlideChange,
  };
}
