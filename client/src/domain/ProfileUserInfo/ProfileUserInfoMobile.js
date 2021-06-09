import React from "react";
import { useTranslation } from "react-i18next";
import ShowMoreText from "react-show-more-text";
import { Link } from "react-router-dom";

import { Typography, Box, Button, IconButton } from "@material-ui/core/";

import MessageIcon from "@material-ui/icons/MessageOutlined";
import DollarIcon from "@material-ui/icons/MonetizationOnOutlined";

import { CHAT_ROUTE } from "../../constants/routes";
import { getSubscriptionBtnText, isAwaitingConfirmation } from "./utils";

import useStyles from "./style";

function ProfileUserInfo({
  className,

  user,
  isOwner,
  isFollow,
  subscriptionPrice,
  followStatus,

  onSubscribeClick,
  onSendTipClick,
}) {
  const classes = useStyles();
  const { t } = useTranslation();

  const handleSendTipClick = () => {
    onSendTipClick && onSendTipClick(user)
  }

  const handleSubscribeClick = () => {
    onSubscribeClick && onSubscribeClick(user)
  }

  return (
    <Box display="flex" flexDirection="column" className={classes.root}>
        {isOwner ? (
          <Button
            disableElevation
            color="primary"
            variant="contained"
            to="statistics"
            component={Link}>
            Statistics
          </Button>
        ) : (
          <>
            <Box className={classes.btnsGroupMobile}>
              <Button
                fullWidth
                disableElevation
                color="primary"
                variant="contained"
                onClick={handleSubscribeClick}>
                {getSubscriptionBtnText(followStatus, subscriptionPrice, t)}
              </Button>
              <IconButton
                className={classes.btnMobile}
                disabled={!isFollow || isAwaitingConfirmation(followStatus)}
                to={CHAT_ROUTE(user.userName)}
                component={Link}>
                <MessageIcon />
              </IconButton>
              <IconButton
                className={classes.btnMobile}
                onClick={handleSendTipClick}>
                <DollarIcon />
              </IconButton>
            </Box>
          </>
        )}
        <Box display="flex" alignItems="center" marginTop={2}>
          <Typography variant="subtitle1" color="textSecondary">
            {user.mood}
          </Typography>
        </Box>
        <Box marginTop={2}>
          <Typography variant="h6">
            Bio
          </Typography>
          <ShowMoreText
            className={classes.bio}
            lines={2}
            more="Show more"
            less="Show less"
            expanded={false}>
            {user.bio}
          </ShowMoreText>
        </Box>
    </Box>
  );
}

export default ProfileUserInfo;

