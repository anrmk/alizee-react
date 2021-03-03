import React from "react";
import PropTypes from "prop-types";

import { Box, Chip, IconButton, Tooltip, Menu as MUIMenu, MenuItem, ListItemIcon, ListItemText, Divider } from "@material-ui/core";
import { withWidth } from "@material-ui/core";

import GiftIcon from "@material-ui/icons/RedeemOutlined";
import StarBorderIcon from "@material-ui/icons/StarBorderOutlined";
import StarIcon from "@material-ui/icons/StarOutlined";
import SendIcon from "@material-ui/icons/SendOutlined";

import useStyles from "./styles";

function Menu({
  isOwner,
  isFavorite,
  anchorEl,

  onSendGiftClick,
  onFavoriteClick,
  onShareClick,
  onClose
}) {
  const classes = useStyles();

  return (
    <Box className={classes.control}>
      <MUIMenu
        keepMounted
        anchorEl={anchorEl}
        open={!!anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={onClose}>
        {!isOwner && (
          <>
            <MenuItem disabled onClick={onSendGiftClick}>
              <ListItemIcon color={isFavorite ? "primary" : "default"}>
                <GiftIcon />
              </ListItemIcon>
              <ListItemText primary="Send gift" />
            </MenuItem>
            <MenuItem onClick={onFavoriteClick}>
              <ListItemIcon color={isFavorite ? "primary" : "default"}>
                {isFavorite ? <StarIcon /> : <StarBorderIcon />}
              </ListItemIcon>
              <ListItemText primary="Add to favorites" />
            </MenuItem>
          </>
        )}
        <MenuItem onClick={onShareClick}>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Share to chat" />
        </MenuItem>
      </MUIMenu>
    </Box>
  );
}

export default Menu;
