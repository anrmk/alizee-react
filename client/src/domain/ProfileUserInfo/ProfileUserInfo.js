import React from "react";
import ShowMoreText from "react-show-more-text";
import { Link } from "react-router-dom";

import { Typography, Box, Card, CardHeader, CardContent, Button } from "@material-ui/core/";

import MessageIcon from "@material-ui/icons/MessageOutlined";
import DollarIcon from "@material-ui/icons/MonetizationOnOutlined";

import { CHAT_ROUTE } from "../../constants/routes";
import { USER_RANKING } from "../../constants/user";

import Avatar from "../../components/Avatar";

import useStyles from "./style";

function ProfileUserInfo({
  user,
  isOwner,
  className,
  onSubscribeTipClick,
  onSendTipClick,
}) {
  const classes = useStyles();

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
        subheader={<Typography variant="subtitle1" color="textSecondary">{user.mood}</Typography>} />
      <CardContent className={classes.content}>
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
            <Button
              className="primary"
              disableElevation
              size="large"
              variant="contained"
              onClick={onSubscribeTipClick}
            >
              Follow {user.subscription ? `for ${user.subscription}` : "for Free"}
            </Button>
            <Box display="flex" alignItems="center" justifyContent="space-between" flexWrap="wrap" my={1}>
              <Button
                className="secondary"
                disableElevation
                size="large"
                variant="contained"
                endIcon={<MessageIcon />}
                to={CHAT_ROUTE(user.userName)}
                component={Link}>
                Message
              </Button>
              <Button
                className="secondary"
                disableElevation
                size="large"
                variant="contained"
                endIcon={<DollarIcon />}
                onClick={() => onSendTipClick(user)}>
                Send Tip
              </Button>
            </Box>
          </>
        )}
        <Typography variant="h6" gutterBottom>
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
