/* eslint-disable no-debugger */
import { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as storyActions from "../store/actions/story";
import ApiContext from "../context/ApiContext";

export default function useStoriesSwitcher({
  username,
  slideId = 0,
  storyId = 0,
  onUpdatePath,
}) {
  const apiClient = useContext(ApiContext);
  const dispatch = useDispatch();

  const data = useSelector((state) => state.story);

  const [currentSlideId, setCurrentSlideId] = useState(slideId);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentUser, setCurrentUser] = useState();
  const [currentStoryIndex, setCurrentStoryIndex] = useState(null);
  const [localSlides, setLocalSlides] = useState([]);

  useEffect(() => {
    if (username) {
      (async () => {
        await dispatch(
          storyActions.getStory(apiClient, { userName: username })
        );
      })();
    }
  }, []);

  const resetStory = async () => {
    await dispatch(storyActions.resetStory());
  };

  const resetFollowingStories = async () => {
    await dispatch(storyActions.resetFollowingStories());
  };

  const getStory = async (userName) => {
    await resetStory();
    await dispatch(storyActions.getStory(apiClient, { userName }));
  };

  useEffect(() => {
    if (data?.currentStory?.slides?.length) {
      const user = {
        userName: data.currentStory.userName,
        name: data.currentStory.name,
        avatarUrl: data.currentStory.avatarUrl,
      };

      const slideIndex = data.currentStory.slides.findIndex(
        (item) => item.id === slideId
      );

      if (currentStoryIndex === null) {
        const storyIndex = storyId;

        setupStory(
          data?.currentStory.slides,
          user,
          slideIndex !== -1 ? slideIndex : 0,
          storyIndex
        );
      } else {
        setupStory(
          data?.currentStory.slides,
          user,
          slideIndex !== -1 ? slideIndex : 0
        );
      }
    }
  }, [data, username]);

  const handleSetStoryIndex = (index) => {
    setCurrentStoryIndex(index);
  };

  const setupStory = (items, user, slideIndex = 0, storyIndex = null) => {
    if (!items?.length) return;
    const lSlideId = items[slideIndex].id;
    items && setLocalSlides(items);
    user && setCurrentUser(user);
    setCurrentSlideIndex(slideIndex);
    setCurrentSlideId(lSlideId);
    if (storyIndex !== null) {
      handleSetStoryIndex(storyIndex);
    }

    onUpdatePath && onUpdatePath(user.userName, lSlideId);
  };

  const changeStory = (pStoryIndex, next = false) => {
    if (
      (!next && pStoryIndex >= 0) ||
      (next && pStoryIndex <= data.data?.length - 1)
    ) {
      const { userName } = data.data[pStoryIndex];
      if (userName !== username) {
        handleSetStoryIndex(pStoryIndex);
        getStory(userName);
      }
    }
  };

  const handleSlideChange = (slides, userInfo, pSlideIndex) => {
    if (slides.length && userInfo) {
      setupStory(slides, userInfo, pSlideIndex, currentStoryIndex);
    }
  };

  const handleNextStory = () => {
    if (data.data.length) {
      const nextStoryIndex = currentStoryIndex + 1;
      changeStory(nextStoryIndex, true);
    }
  };

  const handlePreviousStory = () => {
    if (data.data.length) {
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
    resetStory,
    resetFollowingStories,
  };
}
