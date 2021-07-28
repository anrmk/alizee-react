import React from "react";

import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";

import PhotoCameraIcon from "@material-ui/icons/PhotoCameraOutlined";
import ControlPointIcon from "@material-ui/icons/ControlPointDuplicateOutlined";
import MoodIcon from "@material-ui/icons/Mood";

function PostSprout({
  isOpen,
  onClose,
  onCreatePost,
  onCreateStory,
  onCreateMood,
}) {
  const container = window !== undefined ? window.document.body : undefined;

  const handleCreateMood = () => {
    onClose();
    onCreateMood && onCreateMood();
  };

  const handleCreateStory = () => {
    onClose();
    onCreateStory && onCreateStory();
  };

  const handleCreatePost = () => {
    onClose();
    onCreatePost && onCreatePost();
  };

  /* TODO: create independent DrawerProvider and move out this logic */

  return (
    <Drawer
      anchor="bottom"
      open={isOpen}
      onClose={onClose}
      container={container}
      ModalProps={{ keepMounted: true }}>
      <List>
        <ListItem button onClick={handleCreateMood}>
          <ListItemIcon>
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
  );
}

export default PostSprout;
