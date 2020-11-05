import React, { useState } from "react";

import { CreateForm, CreatePost,  CreateFeeling, CreateStories} from "../../components/Post";

import Modal from "react-bootstrap/Modal";

function PostCreate({user, onSubmit}) {
  const [postType, setPostType] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handlePostFormClick = (e, name) => {
    setPostType(name);
    setShowModal(true);
  };

  const handleModalHide = (e) => {
    setShowModal(false);
  };

  const constRenderCreateForm = (name) => {
    switch(name) {
      case "POST":
        return <CreatePost user={user} onSubmit={handleFormSubmit} />
      case "STORY":
        return <>aaa</>;
      case "FEELING": 
        return <CreateFeeling user={user} onSubmit={handleFormSubmit} />;
      default: 
        return <CreateStories />;
    }
  }

  const handleFormSubmit = (formData, media) => {
    onSubmit && onSubmit(formData, media);
    setShowModal(false);
  }

  return (
    <div>
      <CreateForm formOnClick={handlePostFormClick} />

      <Modal
        dialogClassName="post-share-modal"
        show={showModal}
        aria-labelledby="contained-modal-title-vcenter"
        keyboard={false}
        backdrop="static"
        centered
        onHide={handleModalHide}
      >
        <Modal.Header closeButton>
          <Modal.Title className="h6 ml-auto pl-4">{postType}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { constRenderCreateForm(postType)}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PostCreate;
