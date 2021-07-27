import { useState, useEffect } from "react";


export default function useStoriesSwitcher({ data, slideId, storyId, onUpdatePath }) {
  const [currentSlideId, setCurrentSlideId] = useState(slideId);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [localSlides, setLocalSlides] = useState([]);

  useEffect(() => {
    if (data?.length) {
      if (slideId) {
        const index = data.findIndex(item => !!item.slides.find(item => item.id === slideId));
        if (index !== -1) {
          setupStory(data[index]?.slides, data[index]?.user, 0, index);
        }
      } else if (storyId) {
        const index = data.findIndex(item => item.userId === storyId);
        if (index !== -1) {
          setupStory(data[index]?.slides, data[index]?.user, 0, index);
        }
      } else {
        setupStory(data[0]?.slides, data[0]?.user, 0, 0);
      }
    } else if (data?.slides?.length) {
      const index = data.slides.findIndex(item => item.id === slideId);
      setupStory(data.slides, data?.user, index !== -1 ? index : 0);
    }
  }, [data]);

  const setupStory = (items, user, slideIndex = 0, storyIndex = 0) => {
    if (!items?.length) return;

    const lSlideId = items[slideIndex].id;

    items && setLocalSlides(items);
    user && setCurrentUser(user);
    setCurrentStoryIndex(storyIndex);
    setCurrentSlideIndex(slideIndex);
    setCurrentSlideId(lSlideId);

    onUpdatePath && onUpdatePath(user.userName, lSlideId);
  }

  const changeStory = (pStoryIndex, next = false) => {
    if (!next && pStoryIndex >= 0 || next && pStoryIndex <= data?.length - 1) {
      const userInfo = data[pStoryIndex]?.user;
      let slideIndex = 0;

      !next && (slideIndex = data[pStoryIndex]?.slides?.length - 1);

      setupStory(data[pStoryIndex]?.slides, userInfo, slideIndex, pStoryIndex);
    }
  }

  const handleSlideChange = (slides, userInfo, pSlideIndex) => {
    if (slides.length && userInfo) {
      setupStory(slides, userInfo, pSlideIndex, currentStoryIndex);
    }
  }

  const handleNextStory = () => {
    if (data.length) {
      const nextStoryIndex = currentStoryIndex + 1;
      changeStory(nextStoryIndex, true);
    }
  }

  const handlePreviousStory = () => {
    if (data.length) {
      const previousStoryIndex = currentStoryIndex - 1;
      changeStory(previousStoryIndex);
    }
  }

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
