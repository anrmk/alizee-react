import React, {useState} from "react";

import { AvatarItem } from "../../../components/Avatar";

function CreateFeeling({ onSubmit, user }) {
  const defaultFormData = {
    description: "",
    commentable: true,
    private: false,
    amount: 0,
  };
  const [formData, setFormData] = useState(defaultFormData);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (formData.description.trim().length === 0) return;

    onSubmit && onSubmit(formData, []);
    setFormData(defaultFormData);
  };

  const handleFormDataChange = (e) => {
    var target = e.currentTarget;
    console.log(target.value)

    setFormData({ ...formData, [target.name]: target.value });
  };

  return (
    <form onSubmit={handleFormSubmit} autoComplete="off">
      <AvatarItem url={user.avatarUrl} className="mb-3 justify-content-between"></AvatarItem>
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

      <button
        type="submit"
        className="btn btn-primary btn-sm btn-block"
        disabled={formData.description.length < 0 }
      >
        Post
      </button>
    </form>
  );
}

export default CreateFeeling;
