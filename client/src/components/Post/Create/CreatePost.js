import React, { useState } from "react";

import Thumbnail from "../../../components/Thumbnail";
import { AvatarItem } from "../../../components/Avatar";
import { CreateTools } from "../../../components/Post";

import "./CreatePost.scss";

export default function CreatePost({ onSubmit, user }) {
  const defaultFormData = {
    description: "",
    commentable: true,
    private: false,
    amount: 0,
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [media, setMedia] = useState([]);

  const resetFormData = () => {
    setFormData(defaultFormData);
    setMedia([]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.description.trim().length === 0 && media.length === 0) return;

    onSubmit && onSubmit(formData, media);
    resetFormData();
  };

  const handleFormDataChange = (e) => {
    var target = e.currentTarget;
    switch (target.type) {
      case "button":
        setFormData({
          ...formData,
          [target.name]: !formData[target.name],
        });
        break;
      case "file":
        var mediaFiles = [...target.files];
        mediaFiles.forEach(
          (file) => (file.previewURL = URL.createObjectURL(file))
        );
        setMedia(mediaFiles);
        break;
      default:
        setFormData({ ...formData, [target.name]: target.value });
        break;
    }
  };

  return (
    <form onSubmit={handleFormSubmit} autoComplete="off">
      <AvatarItem url={user.avatarUrl} className="mb-3 justify-content-between">
        <CreateTools
          onChange={handleFormDataChange}
          isPrivate={formData.private}
          isCommentable={formData.commentable}
        />
      </AvatarItem>

      <input type="hidden" name="private" value={formData.private} />
      <input type="hidden" name="commentable" value={formData.commentable} />

      <div className="form-group">
        <textarea
          className="form-control"
          type="text"
          name="description"
          autoFocus
          maxLength="255"
          placeholder={`What's on your mind, ${user.name}?`}
          value={formData.description}
          required
          onChange={handleFormDataChange}
        />
        <small className="form-text text-muted">
          Characters entered {formData.description.length} out of 255
        </small>
      </div>
      <div className="row row-cols-4 no-gutters mb-3">
        {media.map((item) => (
          <Thumbnail
            key={item.name}
            name={item.name}
            url={item.previewURL}
            className="col"
          />
        ))}
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-sm btn-block"
        disabled={formData.description.length < 0 || media.length < 0}
      >
        Post
      </button>
    </form>
  );
}
