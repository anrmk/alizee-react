import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Typography, Box, Button, IconButton, CardHeader } from "@material-ui/core/";

import MessageIcon from "@material-ui/icons/MessageOutlined";
import DollarIcon from "@material-ui/icons/MonetizationOnOutlined";

import { CHAT_ROUTE } from "../../constants/routes";
import { getSubscriptionBtnText, isAwaitingConfirmation } from "./utils";

import useStyles from "./style";

function ProfileUserInfo({
  user,
  isOwner,
  isFollow,
  subscriptionPrice,
  followStatus,

  onSubscribeClick,
  onSendTipClick,
}) {
  const classes = useStyles({ isOwner });
  const { t } = useTranslation();

  const handleSendTipClick = () => {
    onSendTipClick && onSendTipClick(user);
  };

  const handleSubscribeClick = () => {
    onSubscribeClick && onSubscribeClick(user);
  };

  return (
    <Box display="flex" flexDirection="column" padding={1}>
      {isOwner ? (
        <Button disableElevation color="primary" variant="contained" to="statistics" component={Link}>
          Statistics
        </Button>
      ) : (
        <>
          <Box className={classes.btnsGroupMobile}>
            <Button fullWidth disableElevation color="primary" variant="contained" onClick={handleSubscribeClick}>
              {getSubscriptionBtnText(followStatus, subscriptionPrice, t)}
            </Button>
            <IconButton
              color="primary"
              disabled={!isFollow || isAwaitingConfirmation(followStatus)}
              to={CHAT_ROUTE(user.userName)}
              component={Link}
            >
              <MessageIcon />
            </IconButton>
            <IconButton color="primary" onClick={handleSendTipClick}>
              <DollarIcon />
            </IconButton>
          </Box>
        </>
      )}

      {user.mood && (
        <Box marginTop={2}>
          <Typography
            variant="caption"
            color="textSecondary"
            align="justify"
            className={classes.breakText}
            component="p"
          >
            {user.mood}
          </Typography>
        </Box>
      )}
      {user.bio && (
        <Box marginTop={2}>
          <Typography variant="body1" align="justify">
            {user.bio}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default ProfileUserInfo;
