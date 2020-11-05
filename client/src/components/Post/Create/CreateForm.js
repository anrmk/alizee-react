import React from "react";

import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import FeelingIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

function CreateForm({ formOnClick }) {
  const handleOnClick = (e, name) => {
    e.preventDefault();

    formOnClick && formOnClick(e, name);
  };

  return (
    <ul className="nav nav-pills nav-fill">
      <li className="nav-item">
        <a
          className="nav-link"
          href="#"
          onClick={(e) => handleOnClick(e, "POST")}
        >
          <PhotoLibraryIcon fontSize="small" /> PHOTO/VIDEO
        </a>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          href="#"
          onClick={(e) => handleOnClick(e, "FEELING")}
        >
          <FeelingIcon fontSize="small" /> FEELING
        </a>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          href="#"
          onClick={(e) => handleOnClick(e, "STORY")}
        >
          STORY
        </a>
      </li>
    </ul>
  );
}

export default CreateForm;
