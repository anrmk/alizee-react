import React, { useState } from "react";
import PropTypes from "prop-types";

import { CreateForm, CreatePost, CreateFeeling, CreateStories } from "../../components/Post";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Fab } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

import useStyle from "./styles";

function PostSprout({ user, onSubmit, variant }) {
  const classes = useStyle();

  const [postType, setPostType] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handlePostFormClick = (e, name) => {
    setPostType(name);
    setModalOpen(true);
  };

  const handleFormSubmit = (formData, media) => {
    onSubmit && onSubmit(formData, media);
    setModalOpen(false);
  };

  const constRenderCreateForm = (name) => {
    switch (name) {
      case "POST":
        return <CreatePost user={user} onSubmit={handleFormSubmit} />;
      case "STORY":
        return <>in process</>;
      case "FEELING":
        return <CreateFeeling user={user} onSubmit={handleFormSubmit} />;
      default:
        return <CreateStories />;
    }
  };

  return (
    <>
      {variant === "fab" ? (
        <Fab aria-label="Add" color="primary" className={classes.fab} onClick={(e) => handlePostFormClick(e, "POST")}>
          <AddIcon />
        </Fab>
      ) : (
        <CreateForm formOnClick={handlePostFormClick} />
      )}

      <Dialog open={modalOpen} onClose={handleModalClose} disableBackdropClick={true} maxWidth="sm" fullWidth={true}>
        <DialogTitle>Create {postType}</DialogTitle>
        <DialogContent>{constRenderCreateForm(postType)}</DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
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
  variant: "form" || "fab",

  onSubmit: undefined,
};

export default PostSprout;
