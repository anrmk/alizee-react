import { useState, useEffect } from "react";
import { BLOCKED_PUSH_NOTIFICATION } from "../constants/permissions";
import { toBase64 } from "../helpers/functions";

export default function usePushNotifications() {
  const applicationServerPublicKey =
    "BPBPa5A7zqPV9MVLOQMpUYcDooAO5h-ySeZD3hs36Zf1zwf6T2RgmfHO1NQ_VqtDc9g9m46ejHvtCVuTfMmvzvQ";
  const [swRegistration, setSwRegistration] = useState(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    registerServiceWorker();
  }, []);

  const urlB64ToUint8Array = (base64String) => {
    const base64 = toBase64(base64String);

    const outputArray = new Uint8Array(base64.length);

    for (let i = 0; i < base64.length; ++i) {
      outputArray[i] = base64.charCodeAt(i);
    }
    return outputArray;
  };

  const checkSubscription = async (swRegistration) => {
    const subscription = await swRegistration.pushManager.getSubscription();
    return subscription;
  };

  const checkPermission = () => {
    return Notification.permission;
  };

  const updateSubscription = (subscription) => {
    if (subscription) {
      setSubscription(subscription);
      return subscription;
    } else {
      setSubscription(subscription);
      return subscription;
    }
  };

  const updateBtn = (isSubscribed) => {
    if (Notification.permission === BLOCKED_PUSH_NOTIFICATION) {
      setIsSubscribed(false);
      setIsDisable(true);
      return updateSubscription(null);
    }

    if (isSubscribed) {
      setIsSubscribed(isSubscribed);
      return isSubscribed;
    } else {
      setIsSubscribed(isSubscribed);
      return isSubscribed;
    }
  };

  const unsubscribeUser = async () => {
    try {
      const subscription = await swRegistration.pushManager.getSubscription();

      if (subscription) {
        subscription.unsubscribe();
        updateBtn(false);
        return updateSubscription(null);
      }
    } catch (error) {
      updateBtn(false);
      setIsDisable(true);
      return updateSubscription(null);
    }
  };

  const subscribeUser = async () => {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    try {
      const subscription = await swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey,
      });

      updateBtn(true);
      return updateSubscription(JSON.stringify(subscription));
    } catch (error) {
      updateBtn(false);
      return updateSubscription(null);
    }
  };

  const subscribeUserToggle = async () => {
    if (isSubscribed) {
      return await unsubscribeUser();
    } else {
      return await subscribeUser();
    }
  };

  const initializeUI = async (swRegistration) => {
    const subscription = await checkSubscription(swRegistration);
    const isSubscribed = !(subscription === null);

    if (isSubscribed) {
      updateSubscription(JSON.stringify(subscription));
    } else {
      updateSubscription(null);
    }

    updateBtn(isSubscribed);
  };

  const registerServiceWorker = async () => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      try {
        const swReg = await navigator.serviceWorker.register("/sw.js");

        setSwRegistration(swReg);
        initializeUI(swReg);
      } catch (error) {
        setIsDisable(true);
      }
    } else {
      setIsDisable(true);
    }
  };

  return {
    checkPermission,
    isSubscribed,
    subscribeUserToggle,
    isDisable,
    subscription,
  };
}
