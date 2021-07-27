import React from "react";
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

import ShareIcon from "@material-ui/icons/ShareRounded";
import ReportIcon from "@material-ui/icons/ReportRounded";

function StoryDialog({ onShareClick, onReportClick }) {
  return (
    <Box display="block">
      <List>
        <ListItem button onClick={onShareClick}>
          <ListItemIcon>
            <ShareIcon />
          </ListItemIcon>
          <ListItemText primary="Share to Chat" />
        </ListItem>
        <ListItem button onClick={onReportClick}>
          <ListItemIcon>
            <ReportIcon />
          </ListItemIcon>
          <ListItemText primary="Report" />
        </ListItem>
      </List>
    </Box>
  )
}

export default StoryDialog;
