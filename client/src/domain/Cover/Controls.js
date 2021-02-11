import React from "react";
import PropTypes from "prop-types";

import { Box, Chip, IconButton, Tooltip } from "@material-ui/core";
import { withWidth } from "@material-ui/core";

import MailIcon from "@material-ui/icons/MailOutlineOutlined";
import GiftIcon from "@material-ui/icons/RedeemOutlined";
import FollowIcon from "@material-ui/icons/PersonAddOutlined";
import UnfollowIcon from "@material-ui/icons/PersonAddDisabledOutlined";
import StarBorderIcon from "@material-ui/icons/StarBorderOutlined";
import StarIcon from "@material-ui/icons/StarOutlined";
import MonetizationIcon from "@material-ui/icons/MonetizationOnOutlined";

import useStyles from "./styles";

function Controls({
  isOwner,
  isFollow,
  isFavorite,
  width,

  onMessageClick,
  onFollowClick,
  onSendGiftClick,
  onFavoriteClick,
  onSendTipClick,
}) {
  const classes = useStyles();

  return (
    <Box className={classes.control}>
      {/* <Tooltip title="Send gift">
        <IconButton onClick={onSendGiftClick} color="primary">
          <GiftIcon />
        </IconButton>
      </Tooltip> */}
      {!isOwner && (<Tooltip title="Send Tip">
        {["lg", "md", "sm"].includes(width) ? (
          <Chip icon={<MonetizationIcon />} onClick={onSendTipClick} label="SEND TIP" variant="outlined" clickable />
        ) : (
          <IconButton onClick={onSendTipClick}>
            <MonetizationIcon />
          </IconButton>
        )}
      </Tooltip>)}
      
      <Tooltip title="Message">
        <IconButton onClick={onMessageClick}>
          <MailIcon />
        </IconButton>
      </Tooltip>
      
      {!isOwner && (
        <>
          <Tooltip title="Add to favorites">
            <IconButton color={isFavorite ? "primary" : "default"} onClick={onFavoriteClick}>
              {isFavorite ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title={isFollow ? "Unfollow" : "Follow"}>
            <IconButton color={isFollow ? "primary" : "default"} onClick={onFollowClick}>
              {isFollow ? <UnfollowIcon /> : <FollowIcon />}
            </IconButton>
          </Tooltip>
        </>
      )}
    </Box>
  );
}

Controls.propTypes = {
  isOwner: PropTypes.bool,
  isFollow: PropTypes.bool,
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,

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

export default withWidth()(Controls);
