import {} from "react-i18next";

import {
  FOLLOW_NONE,
  FOLLOW_ACCEPTED,
  FOLLOW_PENDING,
  FOLLOW_REJECTED,
  SUBSCRIPTION_STATUS_PENDING,
  SUBSCRIPTION_STATUS_SUCCESS,
  SUBSCRIPTION_STATUS_FAIL,
} from "../../constants/follow_types";

export function getSubscriptionBtnText(
  followStatus,
  subscriptionPrice,
  t,
  subscriptionStatus
) {
  if (subscriptionPrice && followStatus === FOLLOW_NONE) {
    return `${t(
      "ProfileUserInfoSubscribeBtnTextSubscribeForPrice"
    )} $${subscriptionPrice}`;
  }

  if (followStatus === FOLLOW_NONE && !subscriptionPrice)
    return t("ProfileUserInfoSubscribeBtnTextSubscribeForFree");

  if (
    followStatus === FOLLOW_PENDING ||
    subscriptionStatus === SUBSCRIPTION_STATUS_PENDING
  )
    return t("ProfileUserInfoSubscribeBtnTextAwaitConfirm");

  if (followStatus === FOLLOW_ACCEPTED && !subscriptionStatus)
    return t("ProfileUserInfoSubscribeBtnTextSubscription");

  if (
    followStatus === FOLLOW_ACCEPTED &&
    subscriptionStatus === SUBSCRIPTION_STATUS_SUCCESS
  )
    return t("ProfileUserInfoSubscribeBtnTextSubscription");

  if (followStatus === FOLLOW_REJECTED && !subscriptionPrice)
    return t("ProfileUserInfoSubscribeBtnTextSubscribeForFree");

  if (
    (followStatus === FOLLOW_REJECTED ||
      subscriptionStatus === SUBSCRIPTION_STATUS_FAIL) &&
    subscriptionPrice
  )
    return `${t(
      "ProfileUserInfoSubscribeBtnTextSubscribeForPrice"
    )} $${subscriptionPrice}`;

  return t("ProfileUserInfoSubscribeBtnTextSubscribe");
}

export function isAwaitingConfirmation(followStatus) {
  return followStatus !== FOLLOW_ACCEPTED;
}
