import { useCallback } from "react";

export default function useFullScreen(elementOrElementId) {
  const exitFullScreen = useCallback(() => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }, []);

  const toggle = useCallback(async (showFullScreen) => {
    let fullScreenElement =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;

    // exit full screen
    if (!showFullScreen) {
      if (fullScreenElement) {
        exitFullScreen();
      }
      return;
    }

    // get the element to make full screen
    const element =
      typeof elementOrElementId === "string"
        ? document.getElementById(elementOrElementId)
        : elementOrElementId;

    // if there's another element currently full screen, exit first
    if (fullScreenElement && fullScreenElement !== element) {
      exitFullScreen();
      fullScreenElement = null;
    }

    // if the current element is not already full screen, make it full screen
    if (!fullScreenElement) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        // @ts-ignore
        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    }

    // if full screen, the exit on unmount
    if (showFullScreen) {
      // eslint-disable-next-line consistent-return
      return exitFullScreen;
    }

    console.log("Request Full Screen");
  }, []);

  return { toggle };
}
