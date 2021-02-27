import React, { useState } from "react";

import {
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";

import PhotoCameraIcon from "@material-ui/icons/PhotoCameraOutlined";
import ControlPointIcon from "@material-ui/icons/ControlPointDuplicateOutlined";
import MoodIcon from "@material-ui/icons/Mood";
import AddCircleIcon from "@material-ui/icons/AddCircleOutlineOutlined";

function PostSprout({
  onCreatePost,
  onCreateStory,
  onCreateMood,
}) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const container = window !== undefined ? window.document.body : undefined;

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleCreateMood = () => {
    handleDrawerClose();
    onCreateMood && onCreateMood();
  }

  const handleCreateStory = () => {
    handleDrawerClose();
    onCreateStory && onCreateStory();
  }

  const handleCreatePost = () => {
    handleDrawerClose();
    onCreatePost && onCreatePost();
  }

  return (
    <>
      <IconButton onClick={handleDrawerOpen} color="primary">
        <AddCircleIcon />
      </IconButton>

      {/* TODO: create independent DrawerProvider and move out this logic */}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={handleDrawerClose}
        container={container}
        ModalProps={{ keepMounted: true }}
      >
        <List>
          <ListItem button onClick={handleCreateMood}>
            <ListItemIcon >
              <MoodIcon color="action" />
            </ListItemIcon>
            <ListItemText primary="Mood" />
          </ListItem>
          <ListItem button onClick={handleCreateStory}>
            <ListItemIcon>
              <ControlPointIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Story" />
          </ListItem>
          <ListItem button onClick={handleCreatePost}>
            <ListItemIcon>
              <PhotoCameraIcon color="secondary" />
            </ListItemIcon>
            <ListItemText primary="Post" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default PostSprout;