import React from "react";
import { Link } from "react-router-dom";

import {
  Typography,
  Button,
  Box,
  Hidden,
  IconButton,
} from "@material-ui/core/";
import MessageIcon from "@material-ui/icons/MessageOutlined";
import DollarIcon from "@material-ui/icons/MonetizationOnOutlined";

import useStyles from "./style";

import SubscriptionBtn from "./SubscriptionBtn";

import { CHAT_USERNAME_ROUTE } from "../../constants/routes";
import { isAwaitingConfirmation } from "./utils";
import { customFormatDate } from "../../helpers/functions";
import { FOLLOW_ACCEPTED } from "../../constants/follow_types";

function ProfileInteractButtons({
  followStatus,
  subscriptionPrice,
  subscriptionStatus,
  subscriptionExpireDate,
  user,
  isVerified,

  onMenuClick,
  onSendTipClick,
  onSubscribeClick,
}) {
  const classes = useStyles();

  const handleSubscribeClick = () => {
    onSubscribeClick && onSubscribeClick(user);
  };

  const handleSendTipClick = () => {
    onSendTipClick && onSendTipClick(user);
  };
  return (
    <>
      <Hidden smDown>
        <SubscriptionBtn
          onSubscribeClick={handleSubscribeClick}
          followStatus={followStatus}
          subscriptionPrice={user.subscriptionPrice}
          subscriptionStatus={subscriptionStatus}
          subscriptionExpireDate={subscriptionExpireDate}
          onMenuClick={onMenuClick}
        />
        {subscriptionExpireDate && (
          <Typography variant="caption" color="textSecondary" component="p">
            Expired {customFormatDate(subscriptionExpireDate)}
          </Typography>
        )}
        <Box
          width="100%"
          display="flex"
          marginTop={2}
          marginBottom={2}
          flexDirection="column">
          <Button
            fullWidth
            disableElevation
            disabled={
              !(followStatus === FOLLOW_ACCEPTED) ||
              isAwaitingConfirmation(followStatus)
            }
            size="large"
            color="secondary"
            variant="contained"
            endIcon={<MessageIcon />}
            to={CHAT_USERNAME_ROUTE(user.userName)}
            component={Link}
            className={classes.btnMargin}>
            Message
          </Button>
          {isVerified && (
            <Button
              fullWidth
              disableElevation
              size="large"
              color="secondary"
              variant="contained"
              endIcon={<DollarIcon />}
              onClick={handleSendTipClick}>
              Send Tip
            </Button>
          )}
        </Box>
      </Hidden>

      <Hidden mdUp>
        <Box display="flex" alignItems="center" width="100%">
          <SubscriptionBtn
            onSubscribeClick={handleSubscribeClick}
            followStatus={followStatus}
            subscriptionPrice={subscriptionPrice}
            subscriptionStatus={subscriptionStatus}
            subscriptionExpireDate={subscriptionExpireDate}
            onMenuClick={onMenuClick}
          />

          <IconButton
            color="primary"
            disabled={
              !(followStatus === FOLLOW_ACCEPTED) ||
              isAwaitingConfirmation(followStatus)
            }
            to={CHAT_USERNAME_ROUTE(user.userName)}
            component={Link}>
            <MessageIcon />
          </IconButton>
          {isVerified && (
            <IconButton color="primary" onClick={handleSendTipClick}>
              <DollarIcon />
            </IconButton>
          )}
        </Box>
        {subscriptionExpireDate && (
          <Typography variant="caption" color="textSecondary" component="p">
            Expired {customFormatDate(subscriptionExpireDate)}
          </Typography>
        )}
      </Hidden>
    </>
  );
}

export default ProfileInteractButtons;
