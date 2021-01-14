import React, { useState } from "react";
import PropTypes from "prop-types";

import { CreatePost, CreateMood, CreateStories } from "../../components/Post";
import { POST_TYPE } from "../../constants/feed";

import {
  Paper,
  Box,
  Avatar,
  DialogActions,
  ButtonBase,
  Button,
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
import useDialog from "../../hooks/useDialog";

function PostSprout({
  user,
  variant,

  onSubmit
}) {
  const classes = useStyle();

  const FORM_ID = "test";

  const container = window !== undefined ? () => window.document.body : undefined;

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [postType, setPostType] = useState(POST_TYPE.POST);

  const handleFormSubmit = (formData, media) => {
    onSubmit && onSubmit(formData, media);
    dialog.toggleDialog(false);
  };

  const dialogs = {
    [POST_TYPE.POST]: {
      title: "Create Post",
      content: <CreatePost id={FORM_ID} user={user} onSubmit={handleFormSubmit} />,
    },
    [POST_TYPE.STORY]: {
      title: "Create Story",
      content: <CreateStories id={FORM_ID} user={user} onSubmit={handleFormSubmit} />,
    },
    [POST_TYPE.MOOD]: {
      title: "Create Mood",
      content: <CreateMood id={FORM_ID} user={user} onSubmit={handleFormSubmit} />,
    },
  };

  const dialog = useDialog({
    ...dialogs[postType],
    actionsComponent: (
      <DialogActions>
        <Button form={FORM_ID} type="submit">
          Save
        </Button>
        <Button onClick={() => dialog.toggleDialog(false)}>Close</Button>
      </DialogActions>
    ),
    dialogProps: { fullWidth: true },
  });

  const handleDrawerClose = () => {
    setDrawerOpen(false);
    dialog.toggleDialog(false);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
    dialog.toggleDialog(false);
  };

  const handleModalOpen = (ptype) => {
    setPostType(ptype);
    handleDrawerClose();
    dialog.toggleDialog(true);
  };

  const render = () => {
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
      {render()}

      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={handleDrawerClose}
        container={container}
        ModalProps={{ keepMounted: true }}
      >
        <List>
          <ListItem button onClick={() => handleModalOpen(POST_TYPE.MOOD)}>
            <ListItemIcon>
              <MoodIcon />
            </ListItemIcon>
            <ListItemText primary={POST_TYPE.MOOD} />
          </ListItem>
          <ListItem button onClick={() => handleModalOpen(POST_TYPE.STORY)}>
            <ListItemIcon>
              <StoriesIcon />
            </ListItemIcon>
            <ListItemText primary={POST_TYPE.STORY} />
          </ListItem>
          <ListItem button onClick={() => handleModalOpen(POST_TYPE.POST)}>
            <ListItemIcon>
              <CameraIcon />
            </ListItemIcon>
            <ListItemText primary={POST_TYPE.POST} />
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