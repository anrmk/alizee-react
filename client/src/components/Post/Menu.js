import React from "react";

import { ListItemIcon, ListItemText, List, ListItem } from "@material-ui/core";
import BlockIcon from "@material-ui/icons/BlockOutlined";
import ShareIcon from "@material-ui/icons/ShareOutlined";
import ReportIcon from "@material-ui/icons/ReportOutlined";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import SendIcon from "@material-ui/icons/SendOutlined";

export const POST_TYPE = 0;
export const PROFILE_TYPE = 1;

function Menu({
  postId,
  userName,
  isOwner = false,
  type = POST_TYPE,

  onBlock,
  onReport,
  onShare,
  onChatShare,
  onDelete
}) {
  const handleBlockClick = () => {
    onBlock && onBlock({ userName });
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

  return (
    <List>
      {!isOwner && onBlock && (
        <ListItem button onClick={handleBlockClick}>
          <ListItemIcon>
            <BlockIcon />
          </ListItemIcon>
          <ListItemText primary="Block" />
        </ListItem>
      )}

      {!isOwner && onReport && (
        <ListItem button onClick={handleReportClick}>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary="Report" />
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
          <ListItemText primary="Share to..." />
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
