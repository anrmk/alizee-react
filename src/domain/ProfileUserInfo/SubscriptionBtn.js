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

  return (
    <>
      {(isExpired && followStatus === FOLLOW_ACCEPTED) ||
      followStatus === FOLLOW_ACCEPTED ||
      followStatus === FOLLOW_PENDING ||
      subscriptionStatus === SUBSCRIPTION_STATUS_PENDING ? (
        <ButtonGroup
          disableElevation
          color="primary"
          variant="contained"
          size="large"
          fullWidth>
          <Button
            disabled={!(isExpired && followStatus === FOLLOW_ACCEPTED)}
            fullWidth
            onClick={onSubscribeClick}>
            {getSubscriptionBtnText(
              isExpired && followStatus === FOLLOW_ACCEPTED
                ? FOLLOW_NONE
                : followStatus,
              subscriptionPrice,
              t,
              subscriptionStatus
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
      ) : (
        <Button
          className={classes.subscribeBtn}
          disableElevation
          size="large"
          color="primary"
          variant="contained"
          fullWidth
          onClick={onSubscribeClick}>
          {getSubscriptionBtnText(
            followStatus,
            subscriptionPrice,
            t,
            subscriptionStatus
          )}
        </Button>
      )}
    </>
  );
}

export default SubscriptionBtn;
