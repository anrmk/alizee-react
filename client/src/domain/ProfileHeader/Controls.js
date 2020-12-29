import React from "react";
import PropTypes from "prop-types";

import { IconButton, Tooltip } from "@material-ui/core";

import MailIcon from "@material-ui/icons/MailOutlineOutlined";
import GiftIcon from "@material-ui/icons/RedeemOutlined";
import FollowIcon from "@material-ui/icons/PersonAddOutlined";
import UnfollowIcon from "@material-ui/icons/PersonAddDisabledOutlined";

function Controls(props) {
  const { isOwner, isFollowing } = props;
  const { onMessageClick, onFollowClick, onSendGiftClick } = props;

  return (
    <>
      <Tooltip title="Send gift">
        <IconButton onClick={onSendGiftClick} color="primary">
          <GiftIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Message">
        <IconButton onClick={onMessageClick}>
          <MailIcon />
        </IconButton>
      </Tooltip>
      {!isOwner && (
        <Tooltip title={isFollowing ? "Unfollow" : "Follow"}>
          <IconButton onClick={onFollowClick}>{isFollowing ? <UnfollowIcon /> : <FollowIcon />}</IconButton>
        </Tooltip>
      )}
    </>
  );
}

Controls.propTypes = {
  isOwner: PropTypes.bool,
  isFollowing: PropTypes.bool,

  onSendGiftClick: PropTypes.func,
  onMessageClick: PropTypes.func,
  onFollowClick: PropTypes.func,
};

Controls.defaultProps = {
  isOwner: false,
  isFollowing: false,

  onSendGiftClick: undefined,
  onMessageClick: undefined,
  onFollowClick: undefined,
};

export default Controls;
