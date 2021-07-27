import React from "react";

import { ListItemIcon, ListItemText, List, ListItem, Divider } from "@material-ui/core";
import BlockIcon from "@material-ui/icons/BlockOutlined";
import ShareIcon from "@material-ui/icons/ShareOutlined";
import ReportIcon from "@material-ui/icons/ReportOutlined";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SendIcon from "@material-ui/icons/SendOutlined";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import BarChartIcon from "@material-ui/icons/BarChart";

export const POST_TYPE = 0;
export const PROFILE_TYPE = 1;

function Menu({
  postId,
  name,
  userName,
  isOwner,
  isFavorite,
  isBlocked,
  type = POST_TYPE,

  onBlock,
  onReport,
  onShare,
  onChatShare,
  onDelete,
  onFavorite,
  onPostStatistics,
}) {
  const handleBlockClick = () => {
    onBlock && onBlock({ userName, isBlocked: isBlocked });
  };

  const handleReportClick = () => {
    onReport && onReport({ postId, userName });
  };

  const handleShareClick = () => {
    onShare && onShare({ postId, userName, type });
  };

  const handleChatShareClick = () => {
    onChatShare && onChatShare({ postId, userName, type });
  };

  const handleDeleteClick = () => {
    onDelete && onDelete({ postId, userName });
  };

  const handleFavoriteUserClick = () => {
    onFavorite && onFavorite({ userName, isFavorite });
  };

  const handlePostStatisticsClick = () => {
    onPostStatistics && onPostStatistics({ postId });
  };

  return (
    <List component="nav">
      {!isOwner && onBlock && (
        <ListItem button onClick={handleBlockClick}>
          <ListItemIcon>
            <BlockIcon />
          </ListItemIcon>
          <ListItemText primary={isBlocked ? "Unblock this user" : "Block this user"} />
        </ListItem>
      )}

      {!isOwner && onFavorite && (
        <ListItem button onClick={handleFavoriteUserClick}>
          <ListItemIcon>{isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}</ListItemIcon>
          <ListItemText primary="Add to favorites" />
        </ListItem>
      )}

      {!isOwner && <Divider />}

      {!isOwner && onReport && (
        <ListItem button onClick={handleReportClick}>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary="Report" />
        </ListItem>
      )}
      {isOwner && (
        <ListItem button onClick={handlePostStatisticsClick}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Post statistics" />
        </ListItem>
      )}
      {onShare && (
        <ListItem button onClick={handleShareClick}>
          <ListItemIcon>
            <ShareIcon />
          </ListItemIcon>
          <ListItemText primary="Share to..." />
        </ListItem>
      )}

      {onChatShare && (
        <ListItem button onClick={handleChatShareClick}>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <ListItemText primary="Share to chat" />
        </ListItem>
      )}

      {isOwner && onDelete && (
        <ListItem button onClick={handleDeleteClick}>
          <ListItemIcon>
            <DeleteForeverIcon />
          </ListItemIcon>
          <ListItemText primary="Delete post" />
        </ListItem>
      )}
    </List>
  );
}

export default Menu;
