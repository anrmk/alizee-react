import React from "react";

import { ListItemIcon, ListItemText, List, ListItem } from "@material-ui/core";
import BlockIcon from "@material-ui/icons/BlockOutlined";
import ShareIcon from "@material-ui/icons/ShareOutlined";
import ReportIcon from "@material-ui/icons/ReportOutlined";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

function Menu({
  postId,
  userName,
  isOwner = false,

  onBlock,
  onReport,
  onShare,
  onDelete
}) {
  const handleBlockClick = () => {
    onBlock && onBlock({ userName });
  };

  const handleReportClick = () => {
    onReport && onReport({ postId, userName });
  };

  const handleShareClick = () => {
    onShare && onShare({ postId, userName });
  };

  const handleDeleteClick = () => {
    onDelete && onDelete({ postId, userName });
  };

  return (
    <List>
      {!isOwner && (
        <ListItem button onClick={handleBlockClick}>
          <ListItemIcon>
            <BlockIcon />
          </ListItemIcon>
          <ListItemText primary="Block" />
        </ListItem>
      )}

      {!isOwner && (
        <ListItem button onClick={handleReportClick}>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary="Report" />
        </ListItem>
      )}

      <ListItem button onClick={handleShareClick}>
        <ListItemIcon>
          <ShareIcon />
        </ListItemIcon>
        <ListItemText primary="Share to..." />
      </ListItem>

      {isOwner && (
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
