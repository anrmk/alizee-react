import { useContext, useCallback } from "react";

import ApiContext from "../context/ApiContext";

export default function useProfileActions({
  onFollow, onUnfollow, onBlock, onUnblock, onReport, onSendTip
}) {
  const apiClient = useContext(ApiContext);

  const handleFollow = useCallback(async (userName) => {
    await onFollow(apiClient, userName);
  }, []);

  const handleUnfollow = useCallback(async (userName) => {
    await onUnfollow(apiClient, userName);
  }, []);

  const handleBlock = useCallback(async (userName) => {
    await onBlock(apiClient, userName);
  }, []);

  const handleUnblock = useCallback(async (userName) => {
    await onUnblock(apiClient, userName);
  }, []);

  const handleReport = useCallback(async (userName) => {
    await onReport(apiClient, userName);
  }, []);

  const handleSendTip = useCallback(async (userName, amount) => {
    await onSendTip(apiClient, userName, amount);
  }, []);

  return {
    follow: handleFollow,
    unfollow: handleUnfollow,
    block: handleBlock,
    unblock: handleUnblock,
    report: handleReport, 
    sendTip: handleSendTip
  }
}