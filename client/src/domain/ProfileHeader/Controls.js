import React from "react";
import PropTypes from "prop-types";

import { Box, IconButton, Tooltip } from "@material-ui/core";

import MailIcon from "@material-ui/icons/MailOutlineOutlined";
import GiftIcon from "@material-ui/icons/RedeemOutlined";
import FollowIcon from "@material-ui/icons/PersonAddOutlined";
import UnfollowIcon from "@material-ui/icons/PersonAddDisabledOutlined";

function Controls(props) {
  const { isOwner, isFollow } = props;
  const { onMessageClick, onFollowClick, onSendGiftClick } = props;

  return (
    <Box>
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
        <Tooltip title={isFollow ? "Unfollow" : "Follow"}>
          <IconButton color={isFollow ? "primary": "default"} onClick={onFollowClick}>{isFollow ? <UnfollowIcon /> : <FollowIcon />}</IconButton>
        </Tooltip>
      )}
    </Box>
  );
}

Controls.propTypes = {
  isOwner: PropTypes.bool,
  isFollow: PropTypes.bool,

  onSendGiftClick: PropTypes.func,
  onMessageClick: PropTypes.func,
  onFollowClick: PropTypes.func,
};

Controls.defaultProps = {
  isOwner: false,
  isFollow: false,

  onSendGiftClick: undefined,
  onMessageClick: undefined,
  onFollowClick: undefined,
};

export default Controls;
