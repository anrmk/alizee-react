import React from "react";
import PropTypes from "prop-types";

import { Grid, Typography, IconButton, Button } from "@material-ui/core";

import SettingsIcon from "@material-ui/icons/Settings";
import MoreIcon from "@material-ui/icons/MoreHoriz";
import FollowedIcon from "@material-ui/icons/HowToReg";
import SendIcon from "@material-ui/icons/SendOutlined";

function TopButtons({
  followId,
  userId,
  me,
  username,
  followed,

  onMessageClick,
  onFollowClick,
  onEditClick,
  onSettingsClick,
}) {
  const handleFollowClick = (id, userId) => {
    onFollowClick && onFollowClick(id, userId);
  };

  return (
    <Grid container>
      <Grid item xs>
        <Typography gutterBottom variant="h4">
          {username}
        </Typography>
      </Grid>
      <Grid item>
        {me ? (
          <IconButton onClick={onEditClick}>{me ? <SettingsIcon /> : <MoreIcon />}</IconButton>
        ) : (
          <>
            <Button variant="outlined" size="small" startIcon={<SendIcon/>} onClick={onMessageClick} >Message</Button> &nbsp;
            <Button variant="outlined" size="small" startIcon={<FollowedIcon />} onClick={() => handleFollowClick(followId, userId)}>{followed ? "unfollow" : "follow"}</Button> 
          </>
        )}
      </Grid>
    </Grid>
  );
}

TopButtons.propTypes = {
  followId: PropTypes.string,
  userId: PropTypes.string,
  me: PropTypes.bool,
  username: PropTypes.string,
  followed: PropTypes.bool,

  onMessageClick: PropTypes.func,
  onFollowClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onSettingsClick: PropTypes.func,
};

TopButtons.defaultProps = {
  followId: "",
  userId: "",
  me: false,
  username: "",
  followed: false,

  onMessageClick: undefined,
  onFollowClick: undefined,
  onEditClick: undefined,
  onSettingsClick: undefined,
};

export default TopButtons;
