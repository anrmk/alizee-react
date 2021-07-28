import { useState } from "react";

const PERMISSION_STATE_GRANTED = "granted";

export default function useCameraMicPermissions() {
  const [cameraGranted, setCameraGranted] = useState(false);
  const [micGranted, setMicGranted] = useState(false);

  const requestBothPermissions = async () => {
    await requestCameraPermission();
    await requestMicPermission();
  };

  const requestCameraPermission = async () => {
    const res = await navigator.permissions.query({ name: "camera" });
    setCameraGranted(res.state === PERMISSION_STATE_GRANTED);
    res.onchange = (e) => {
      setCameraGranted(e.currentTarget.state === PERMISSION_STATE_GRANTED);
    };
  };

  const requestMicPermission = async () => {
    const res = await navigator.permissions.query({ name: "microphone" });
    setMicGranted(res.state === PERMISSION_STATE_GRANTED);
    res.onchange = (e) => {
      setMicGranted(e.currentTarget.state === PERMISSION_STATE_GRANTED);
    };
  };

  return {
    cameraGranted,
    micGranted,
    requestBothPermissions,
    requestCameraPermission,
    requestMicPermission,
  };
}
