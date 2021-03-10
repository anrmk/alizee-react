import React from "react";
import ShowMoreText from "react-show-more-text";
import { Link } from "react-router-dom";

import { Typography, Box, Card, CardHeader, CardContent, Button, IconButton, Tooltip } from "@material-ui/core/";

import MessageIcon from "@material-ui/icons/MessageOutlined";
import DollarIcon from "@material-ui/icons/MonetizationOnOutlined";
import EditIcon from "@material-ui/icons/EditRounded";
import AddIcon from "@material-ui/icons/AddRounded";

import { CHAT_ROUTE } from "../../constants/routes";
import { USER_RANKING } from "../../constants/user";
import Avatar from "../../components/Avatar";

import useStyles from "./style";

function ProfileUserInfo({
  user,
  isOwner,
  isFollow,
  className,
  onSubscribeClick,
  onSendTipClick,
  onMoodUpdateClick
}) {
  const classes = useStyles();

  const handleSendTipClick = () => {
    onSendTipClick && onSendTipClick(user)
  }

  const handleSubscribeClick = () => {
    onSubscribeClick && onSubscribeClick(user)
  }

  return (
    <Card>
      <CardHeader
        className={classes.header}
        avatar={
          <Avatar
            className={classes.avatarHeader}
            src={user.avatarUrl}
            online={isOwner || !user.offlineDate} 
            live={user.live} // TODO: add a condition to check is not it me
            size="huge"
            borderColor={USER_RANKING[user.ranking]}
            borderWidth="4px"
            dotWidth="12px" />
        }
        titleTypographyProps={{ variant: "h5" }}
        title={user.name}
        subheader={
          <>
            <Typography variant="subtitle1" color="textSecondary">
              {user.mood}
            </Typography>
            {isOwner && (
              <Tooltip title={user.mood ? "Change mood" : "Add mood"}>
                <IconButton onClick={onMoodUpdateClick}>
                  {user.mood ? <EditIcon /> : <AddIcon />}
                </IconButton>
              </Tooltip>
            )}
          </>
        } />
      <CardContent className={classes.content}>
        {isOwner ? (
          <Button
            disableElevation
            size="large"
            color="primary"
            variant="contained"
            to="statistics"
            component={Link}>
            Statistics
          </Button>
        ) : (
          <>
            <Button
              disableElevation
              size="large"
              color="primary"
              variant="contained"
              onClick={handleSubscribeClick}>
              {isFollow ? 
                "Unfollow" : (
                `Follow ${user.subscriptionPrice ? `for $${user.subscriptionPrice}` : "for Free"}`
              )}
            </Button>
            <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" my={1}>
              <Button
                disableElevation
                size="large"
                color="secondary"
                variant="contained"
                endIcon={<MessageIcon />}
                to={CHAT_ROUTE(user.userName)}
                component={Link}>
                Message
              </Button>
              <Button
                disableElevation
                size="large"
                color="secondary"
                variant="contained"
                endIcon={<DollarIcon />}
                onClick={handleSendTipClick}>
                Send Tip
              </Button>
            </Box>
          </>
        )}
        <Typography className={classes.bioHeader} variant="h6">
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
      </CardContent>
    </Card>
  );
}

export default ProfileUserInfo;
