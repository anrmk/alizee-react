import React from "react";
import PropTypes from 'prop-types';

import { Avatar } from "../../components/Avatar";
import { getHostFromUrl } from "../../helpers/functions";
import Statistics from "./Statistics";
import TopButtons from "./TopButtons";

function ProfileHeader({ 
  me,
  fullName, 
  username, 
  bio, 
  sites,
  avatarUrl,

  postsCount,
  followersCount,
  followingCount,

  onEditClick,
  onMessageClick,
  onFollowClick,
  onSettingsClick
}) {
  return (
    <div className="row p-4">
      <div className="col-lg-3 col-md-12 d-flex justify-content-center justify-content-lg-start">
        <Avatar size="large" url={avatarUrl} />
      </div>
      <div className="col-lg-9 col-md-12">
        <TopButtons 
          me={me}
          username={username}
          onEditClick={onEditClick}
          onMessageClick={onMessageClick}
          onFollowClick={onFollowClick}
          onSettingsClick={onSettingsClick} />
        <Statistics 
          username={username}
          postsCount={postsCount} 
          followersCount={followersCount} 
          followingCount={followingCount} />
        {/* Full name */}
        <div className="d-flex mt-4 justify-content-center justify-content-lg-start">
          <p className="m-0 h5 text-uppercase">{fullName}</p>
        </div>
        {/* Bio */}
        <div className="d-flex mt-2 justify-content-center justify-content-lg-start">
          <p className="m-0">{bio}</p>
        </div>
        {/* Sites */}
        <div className="d-flex flex-column mt-2 justify-content-center justify-content-lg-start">
          {sites.length > 0 && sites.map((url, i) => (
            <a key={i} href={url} target="_blank" className="m-0">{getHostFromUrl(url)}</a>
          ))}
        </div>
      </div>
    </div>
  );
}

ProfileHeader.propTypes = {
  me: PropTypes.bool,
  fullName: PropTypes.string,
  username: PropTypes.string,
  followed: PropTypes.bool,
  avatarUrl: PropTypes.string,

  bio: PropTypes.string,
  sites: PropTypes.array,

  postsCount: PropTypes.number,
  followersCount: PropTypes.number,
  followingCount: PropTypes.number,

  onMessageClick: PropTypes.func,
  onFollowClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onSettingsClick: PropTypes.func
}

ProfileHeader.defaultProps = {
  me: false,
  fullName: "",
  username: "",
  followed: false,
  avatarUrl: "",

  bio: "",
  sites: [],

  postsCount: 0,
  followersCount: 0,
  followingCount: 0,

  onMessageClick: undefined,
  onFollowClick: undefined,
  onEditClick: undefined,
  onSettingsClick: undefined
};

export default ProfileHeader;
