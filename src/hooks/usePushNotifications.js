/* eslint-disable no-return-await */
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

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < base64.length; ++i) {
      outputArray[i] = base64.charCodeAt(i);
    }
    return outputArray;
  };

  const checkSubscription = async (pSwRegistration) =>
    await pSwRegistration.pushManager.getSubscription();

  const checkPermission = () => Notification.permission;

  const updateSubscription = (newSubscription) => {
    if (newSubscription) {
      setSubscription(newSubscription);
      return newSubscription;
    }
    setSubscription(newSubscription);
    return newSubscription;
  };

  const updateBtn = (subscriptionStatus) => {
    if (Notification.permission === BLOCKED_PUSH_NOTIFICATION) {
      setIsSubscribed(false);
      setIsDisable(true);
      return updateSubscription(null);
    }

    if (subscriptionStatus) {
      setIsSubscribed(subscriptionStatus);
      return subscriptionStatus;
    }
    setIsSubscribed(subscriptionStatus);
    return subscriptionStatus;
  };

  const unsubscribeUser = async () => {
    try {
      const localSubscription =
        await swRegistration.pushManager.getSubscription();

      if (localSubscription) {
        localSubscription.unsubscribe();
        updateBtn(false);
        return updateSubscription(null);
      }
    } catch (error) {
      updateBtn(false);
      setIsDisable(true);
      return updateSubscription(null);
    }

    return null;
  };

  const subscribeUser = async () => {
    const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
    try {
      const localSubscription = await swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });

      updateBtn(true);
      return updateSubscription(JSON.stringify(localSubscription));
    } catch (error) {
      updateBtn(false);
      return updateSubscription(null);
    }
  };

  const subscribeUserToggle = async () => {
    if (isSubscribed) {
      return await unsubscribeUser();
    }
    return await subscribeUser();
  };

  const initializeUI = async (pSwRegistration) => {
    const localSubscription = await checkSubscription(pSwRegistration);
    const subscriptionStatus = !(localSubscription === null);

    if (subscriptionStatus) {
      updateSubscription(JSON.stringify(localSubscription));
    } else {
      updateSubscription(null);
    }

    updateBtn(subscriptionStatus);
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
