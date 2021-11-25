import React from "react";

import { List, ListItemText, ListItem, ListItemIcon } from "@material-ui/core";

import CheckOutlinedIcon from "@material-ui/icons/CheckOutlined";

function Benefits({ data }) {
  return (
    <List disablePadding>
      <ListItem disableGutters dense>
        <ListItemIcon>
          <CheckOutlinedIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Full access to this model's content" />
      </ListItem>
      <ListItem disableGutters dense>
        <ListItemIcon>
          <CheckOutlinedIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Direct message with this model" />
      </ListItem>
      <ListItem disableGutters dense>
        <ListItemIcon>
          <CheckOutlinedIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Cancel your subscription at any time" />
      </ListItem>
    </List>
  );
}

export default Benefits;
