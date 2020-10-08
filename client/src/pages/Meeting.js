import React from "react";
import { useHistory } from "react-router-dom";
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';

import meetImage from "../../src/assets/img/meet_image.jpg";

function Meeting() {
  const history = useHistory();

  const handleCreate = () => {
    history.push(`/room`);
  }

  const handleJoin = () => {
    history.push(`/room`);
  };

  return (
    <div className="container full-container p-4 d-flex align-items-center">
      <div className="row align-items-center">
        <div className="col-lg">
          <h1 className="h1">Premium video meetings. Now free for everyone.</h1>
          <p className="lead">
            We re-engineered the service we built for secure business meetings,
            Google Meet, to make it free and available for all.
          </p>
          <hr />
          <div className="form-inline">
            <button
              className="btn btn-success mr-2"
              onClick={() => handleCreate()}
            >
              <VideocamOutlinedIcon className="mr-2" /> New meeting
            </button>
            <div className="form-group">
              <input
                className="form-control"
                type="link"
                placeholder="Enter a code or link"
              />
            </div>
            <button className="btn btn-light" onClick={() => handleJoin()}>
              Join
            </button>
          </div>
        </div>
        <div className="col-lg">
          <img className="img-fluid rounded image" src={meetImage} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Meeting;
