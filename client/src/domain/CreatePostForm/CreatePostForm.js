import React, { useState, useRef } from "react";

import FileUploader from "../../components/FileUploader";

import './CreatePostForm.scss';

const initialFormData = {
  description: '',
  commentable: false,
  private: false,
  amount: 0
}

export default function CreatePostForm({ onSubmit }) {
  const uploaderRef = useRef();
  const [media, setMedia] = useState([]);
  const [formData, setFormData] = useState(initialFormData)

  const resetFormData = () => {
    setFormData(initialFormData);
    setMedia([]);
    uploaderRef.current.resetData();
  }

  const handleFormChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    if (!name) return;

    setFormData({
      ...formData,
      [name]: value
    })
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    onSubmit && onSubmit(formData, media);
    resetFormData();
  }

  const handleFilesAdded = (files) => {
    setMedia(files);
  }

  return (
    <div className="card mb-3">
      <div className="card-body">
        <form onSubmit={handleFormSubmit} onChange={handleFormChange}>
          <div className="form-group">
            <textarea 
              className="form-control create-post-form__text-area mb-3"
              name="description"
              maxLength="2048"
              placeholder="Your description"
              value={formData.description}
              onChange={() => {}} />
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <div className="input-group-text">$</div>
              </div>
              <input 
                className="form-control"
                name="amount"
                type="number"
                min="0"
                aria-label="Amount (to the nearest dollar)"
                placeholder="Amount"
                value={formData.amount}
                onChange={() => {}} />
            </div>
          </div>
          <div className="form-group d-flex mb-3">
            <div className="form-check">
              <input 
                className="form-check-input"
                id="commentable"
                type="checkbox"
                name="commentable"
                label="Commentable"
                checked={formData.commentable}
                onChange={() => {}} />
              <label className="form-check-label" htmlFor="commentable">
                Commentable
              </label>
            </div>
            <div className="form-check ml-3">
              <input 
                className="form-check-input"
                id="private"
                name="private"
                type="checkbox"
                label="Private"
                checked={formData.private}
                onChange={() => {}} />
              <label className="form-check-label" htmlFor="private">
                Private
              </label>
            </div>
          </div>
          <FileUploader ref={uploaderRef} className="mb-3" onChange={handleFilesAdded} />
          <button type="submit" class="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  );
}
