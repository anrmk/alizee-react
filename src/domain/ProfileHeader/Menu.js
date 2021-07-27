import React from "react";

import { Box, Menu as MUIMenu, MenuItem, ListItemIcon, ListItemText } from "@material-ui/core";

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

  const renderOwnerMenu = () => (
    <MUIMenu
      keepMounted
      anchorEl={anchorEl}
      open={!!anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={onClose}>
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
      <MenuItem onClick={onShareClick}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Share to chat" />
      </MenuItem>
    </MUIMenu>
  );

  const renderMenu = () => (
    <MUIMenu
      keepMounted
      anchorEl={anchorEl}
      open={!!anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={onClose}>
      <MenuItem onClick={onShareClick}>
        <ListItemIcon>
          <SendIcon />
        </ListItemIcon>
        <ListItemText primary="Share to chat" />
      </MenuItem>
    </MUIMenu>
  );

  return (
    <Box className={classes.control}>
      {!isOwner ? renderOwnerMenu() : renderMenu()}
    </Box>
  );
}

export default Menu;
