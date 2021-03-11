import React, { useState } from "react";

import { ListItemIcon, ListItemText,  List, ListItem } from "@material-ui/core";
import ShareIcon from "@material-ui/icons/ShareOutlined";
import ReportOutlinedIcon from "@material-ui/icons/ReportOutlined";

function Menu({
  postId,
  userName,
  isOwner,

  onReport,
  onShareClick
}) {
   const handleReport = () => {
     onReport && onReport(userName);
   };

   const handleShareClick = () => {
      onShareClick && onShareClick({ postId, userName });
   };

  return (
    <List>
      <ListItem button onClick={handleReport}>
        <ListItemIcon><ReportOutlinedIcon /></ListItemIcon>  
        <ListItemText primary="Report" />
      </ListItem>

      <ListItem button onClick={handleShareClick}>
        <ListItemIcon><ShareIcon /></ListItemIcon>
        <ListItemText primary="Share to..." />
      </ListItem>
    </List>
  );
}

export default Menu;
