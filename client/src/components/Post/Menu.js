import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { getUrlTo } from "../../helpers/functions";
import { PROFILE_USERNAME_ROUTE } from "../../constants/routes";

import { Menu as MUIMenu, MenuItem, ListItemIcon, ListItemText, Divider, IconButton, Box } from "@material-ui/core";
import AccountIcon from "@material-ui/icons/AccountCircleOutlined";
import LinkIcon from "@material-ui/icons/LinkOutlined";
import BlockIcon from "@material-ui/icons/BlockOutlined";
import ReportIcon from "@material-ui/icons/ReportOutlined";
import FollowIcon from "@material-ui/icons/PersonAddOutlined";
import UnfollowIcon from "@material-ui/icons/PersonAddDisabledOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVertOutlined";

function Menu({
  user,
  isOwner,

  onFollow,
  onUnfollow,

  onBlock,
  onUnblock,

  onReport,
}) {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const menuId = "profile-navbar-menu";
  const menuOpen = Boolean(anchorEl);

  const history = useHistory();
  const location = window.location.origin;
  const profileUrl = getUrlTo(location, PROFILE_USERNAME_ROUTE(user.userName));

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFollow = () => {
    onFollow && onFollow(user.userName);
  };

  const handleUnfollow = () => {
    onUnfollow && onUnfollow(user.userName);
  };

  const handleBlock = () => {
    onBlock && onBlock(user.userName);
  };

  const handleUnblock = () => {
    onUnblock && onUnblock(user.userName);
  };

  const handleGoToProfile = () => {
    history.push(PROFILE_USERNAME_ROUTE(user.userName));
  };

  const handleCopyLink = () => {
    handleMenuClose();
    navigator.clipboard.writeText(profileUrl);
  };

  const handleReport = () => {
    handleMenuClose();
    onReport && onReport(user.userName);
  };

  return (
    <>
      <IconButton
        ref={anchorEl}
        aria-controls={menuId}
        aria-label="Profile menu"
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>

      <MUIMenu
        id={menuId}
        keepMounted
        anchorEl={anchorEl}
        open={menuOpen}
        
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleGoToProfile} >
          <ListItemIcon>
            <AccountIcon />
          </ListItemIcon>
          <ListItemText primary={`${t("GoToProfile")} ${user.name}`} secondary={user.userName} />
        </MenuItem>
        <Divider />

        {!isOwner && (
          <Box>
            <MenuItem onClick={user.isBlocked ? handleUnblock : handleBlock}>
              <ListItemIcon>
                <BlockIcon />
              </ListItemIcon>
              <ListItemText primary={user.isBlocked ? t("Unblock") : t("Block")} />
            </MenuItem>

            <MenuItem onClick={handleReport}>
              <ListItemIcon>
                <ReportIcon />
              </ListItemIcon>
              <ListItemText primary={t("Report")} />
            </MenuItem>

            <MenuItem onClick={user.isFollow ? handleUnfollow : handleFollow}>
              <ListItemIcon>{user.isFollow ? <UnfollowIcon /> : <FollowIcon />}</ListItemIcon>
              <ListItemText primary={user.isFollow ? t("Unfollow") : t("Follow")} />
            </MenuItem>
          </Box>
        )}

        <MenuItem onClick={handleCopyLink}>
          <ListItemIcon>
            <LinkIcon />
          </ListItemIcon>
          <ListItemText primary={t("CopyLink")} />
        </MenuItem>
      </MUIMenu>
    </>
  );
}

export default Menu;
