import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonGroup } from "@material-ui/core/";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { getSubscriptionBtnText } from "./utils";
import { isExpiredSubscription } from "../../helpers/functions";
import {
  FOLLOW_NONE,
  FOLLOW_ACCEPTED,
  FOLLOW_PENDING,
  SUBSCRIPTION_STATUS_PENDING,
  SUBSCRIPTION_STATUS_SUCCESS,
} from "../../constants/follow_types";

import useStyles from "./style";

function SubscriptionBtn({
  subscriptionPrice,
  followStatus,
  subscriptionStatus,
  subscriptionExpireDate,

  onSubscribeClick,
  onMenuClick,
}) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [isExpired, setIsExpired] = useState(null);
  useEffect(() => {
    setIsExpired(isExpiredSubscription(subscriptionExpireDate));
  }, [subscriptionExpireDate]);

  const handleDisableBtn = () => {
    if (
      (followStatus === FOLLOW_ACCEPTED &&
        subscriptionPrice &&
        !subscriptionStatus &&
        !isExpired) ||
      (isExpired && subscriptionStatus === SUBSCRIPTION_STATUS_SUCCESS)
    ) {
      return false;
    }

    if (
      subscriptionStatus === SUBSCRIPTION_STATUS_PENDING ||
      followStatus === FOLLOW_PENDING ||
      followStatus === FOLLOW_ACCEPTED
    ) {
      return true;
    }
    return false;
  };
  return (
    <ButtonGroup
      disableElevation
      color="primary"
      variant="contained"
      size="large"
      fullWidth>
      <Button
        disabled={handleDisableBtn()}
        fullWidth
        onClick={onSubscribeClick}>
        {getSubscriptionBtnText(
          isExpired && followStatus === FOLLOW_ACCEPTED
            ? FOLLOW_NONE
            : followStatus,
          subscriptionPrice,
          t,
          subscriptionStatus,
          isExpired
        )}
      </Button>
      <Button
        size="small"
        color="primary"
        onClick={onMenuClick}
        style={{ maxWidth: "max-content" }}>
        <ArrowDropDownIcon />
      </Button>
    </ButtonGroup>
  );
}

export default SubscriptionBtn;
