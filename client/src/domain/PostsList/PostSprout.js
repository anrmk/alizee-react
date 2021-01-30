import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Paper,
  Box,
  Avatar,
  ButtonBase,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import StoriesIcon from "@material-ui/icons/AmpStories";
import MoodIcon from "@material-ui/icons/Mood";
import AddCircleIcon from "@material-ui/icons/AddCircleOutlineOutlined";

import useStyle from "./styles";
import { CREATE_MOOD_DIALOG_TYPE, CREATE_POST_DIALOG_TYPE, CREATE_STORY_DIALOG_TYPE } from "../../constants/dialogs";

function PostSprout({
  userName,
  variant,

  onDialogToggle
}) {
  const classes = useStyle();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const container = window !== undefined ? window.document.body : undefined;

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDialogToggle = (type, data) => {
    handleDrawerClose();
    onDialogToggle && onDialogToggle(type, data);
  };

  // TODO: remove it
  const renderBtn = () => {
    if (variant === "icon") {
      return (
        <IconButton onClick={handleDrawerOpen}>
          <AddCircleIcon />
        </IconButton>
      );
    } else if (variant === "button") {
      return (
        <Paper className={classes.root} variant="outlined">
          <ButtonBase className={classes.button} onClick={handleDrawerOpen}>
            <Avatar>
              <AddIcon />
            </Avatar>
            <Box p={(0, 2)}>
              <Typography variant="h6">Create a Story</Typography>
              <Typography variant="caption">Share a post or write something</Typography>
            </Box>
          </ButtonBase>
        </Paper>
      );
    }
  };

  return (
    <>
      {renderBtn()}

      {/* TODO: create independent DrawerProvider and move out this logic */}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={handleDrawerClose}
        container={container}
        ModalProps={{ keepMounted: true }}
      >
        <List>
          <ListItem button onClick={() => handleDialogToggle(CREATE_MOOD_DIALOG_TYPE, userName)}>
            <ListItemIcon>
              <MoodIcon />
            </ListItemIcon>
            <ListItemText primary="Mood" />
          </ListItem>
          <ListItem button onClick={() => handleDialogToggle(CREATE_STORY_DIALOG_TYPE)}>
            <ListItemIcon>
              <StoriesIcon />
            </ListItemIcon>
            <ListItemText primary="Story" />
          </ListItem>
          <ListItem button onClick={() => handleDialogToggle(CREATE_POST_DIALOG_TYPE)}>
            <ListItemIcon>
              <CameraIcon />
            </ListItemIcon>
            <ListItemText primary="Post" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

PostSprout.propTypes = {
  user: PropTypes.object,
  variant: PropTypes.string,
  onSubmit: PropTypes.func,
};

PostSprout.defaultProps = {
  user: {},
  variant: "button" || "icon",
  onSubmit: undefined,
};

export default PostSprout;