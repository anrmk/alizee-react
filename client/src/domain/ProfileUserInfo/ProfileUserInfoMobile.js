import React from "react";
import ShowMoreText from "react-show-more-text";
import { Link } from "react-router-dom";

import { Typography, Box, Button, IconButton, Tooltip } from "@material-ui/core/";

import MessageIcon from "@material-ui/icons/MessageOutlined";
import DollarIcon from "@material-ui/icons/MonetizationOnOutlined";
import EditIcon from "@material-ui/icons/EditRounded";

import { CHAT_ROUTE } from "../../constants/routes";

import useStyles from "./style";

function ProfileUserInfo({
  user,
  isOwner,
  className,
  onSubscribeTipClick,
  onSendTipClick,
  onMoodUpdateClick
}) {
  const classes = useStyles();

  const handleSendTipClick = () => {
    onSendTipClick && onSendTipClick(user)
  }

  return (
    <Box display="flex" flexDirection="column">
        {isOwner ? (
          <Button
            className="primary"
            disableElevation
            size="large"
            variant="contained"
            to="statistics"
            component={Link}>
            Statistics
          </Button>
        ) : (
          <>
            <Box className={classes.btnsGroupMobile}>
              <Button
                className="primary"
                fullWidth
                disableElevation
                size="large"
                variant="contained"
                onClick={onSubscribeTipClick}>
                Follow {user.subscription ? `for ${user.subscription}` : "for Free"}
              </Button>
              <IconButton
                className={classes.btnMobile}
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
          <ShowMoreText
            className={classes.moodMobile}
            lines={1}
            more="Show more"
            less="Show less"
            expanded={false}>
            {user.mood}
          </ShowMoreText>
          {isOwner && (
            <IconButton onClick={onMoodUpdateClick}>
              <EditIcon />
            </IconButton>
          )}
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

