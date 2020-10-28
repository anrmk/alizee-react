import React from "react";
import PropTypes from 'prop-types';

import SettingsIcon from '@material-ui/icons/Settings';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import FollowedIcon from '@material-ui/icons/HowToReg';

function TopButtons({ 
  followId,
  userId,
  me,
  username,
  followed,

  onMessageClick,
  onFollowClick,
  onEditClick,
  onSettingsClick
}) {
  const handleFollowClick = (id, userId) => {
    onFollowClick && onFollowClick(id, userId);
  }

  return (
    <div className="d-flex justify-content-center align-items-center justify-content-lg-start flex-wrap">
      <p className="mb-3 m-lg-0 m-md-0 h3 font-weight-light">{username}</p>
      <div className="ml-lg-auto ml-md-3">
        {me ? (
          <button 
            type="button" 
            className="btn btn-outline-dark ml-4 btn-sm"
            onClick={onEditClick}>Edit profile</button>
        ) : (
          <>
            <button 
              type="button" 
              className="btn btn-outline-dark btn-sm"
              onClick={onMessageClick}>Message</button>
            <button 
              type="button"
              className="btn btn-outline-dark ml-2 btn-sm"
              onClick={() => handleFollowClick(followId, userId)}>{followed ? <FollowedIcon style={{ fontSize: "1.2rem" }} /> : "Follow"}</button>
          </>
        )}
        <button 
          type="button"
          className="btn ml-2 p-0 btn-sm"
          onClick={onSettingsClick}>{me ? <SettingsIcon /> : <MoreIcon />}</button>
      </div>
    </div>
  );
}

TopButtons.propTypes = {
  followId: PropTypes.string,
  userId: PropTypes.string,
  me: PropTypes.bool,
  username: PropTypes.string,
  followed: PropTypes.bool,

  onMessageClick: PropTypes.func,
  onFollowClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onSettingsClick: PropTypes.func
}

TopButtons.defaultProps = {
  followId: "",
  userId: "",
  me: false,
  username: "",
  followed: false,

  onMessageClick: undefined,
  onFollowClick: undefined,
  onEditClick: undefined,
  onSettingsClick: undefined
};

export default TopButtons;
