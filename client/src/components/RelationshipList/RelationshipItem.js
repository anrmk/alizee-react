import React from "react";
import PropTypes from 'prop-types';

import CustomLink from "../CustomLink";
import { AvatarItem } from "../Avatar";
import { ItemList } from "../List";
import { PROFILE_ROUTE } from "../../constants/routes";

function RelationshipItem({
  id,
  userId,
  avatarUrl,
  username,
  isFollowing,
  me,

  onFollowClick
}) {
  const handleFollowClick = (id, uId) => {
    onFollowClick && onFollowClick(id, uId);
  }

  return (
    <ItemList className="d-flex justify-content-between align-items-center p-2">
      <AvatarItem url={avatarUrl}>
        {avatarUrl}
        <CustomLink
          as="div"
          to={PROFILE_ROUTE(username)}
          style={{ cursor: "pointer" }}
        >
          {username}
        </CustomLink>
        <small className="text-muted">recommended</small>
      </AvatarItem>
      {!me && (
        <button
          className={`btn btn-sm ${
            isFollowing ? "btn-outline-primary" : "btn-primary"
          } ml-2`}
          type="button"
          onClick={() => handleFollowClick(id, userId)}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>
      )}
    </ItemList>
  );
}

RelationshipItem.propTypes = {
  id: PropTypes.string,
  userId: PropTypes.string,
  avatarUrl: PropTypes.string,
  username: PropTypes.string,
  isFollowing: PropTypes.bool,
  me: PropTypes.bool,

  onFollowClick: PropTypes.func
}

RelationshipItem.defaultProps = {
  id: "",
  userId: "",
  avatarUrl: "",
  username: "",
  isFollowing: false,
  me: false,

  onFollowClick: undefined
};

export default RelationshipItem;
