import React from "react";
import PropTypes from 'prop-types';

import { VerticalList } from "../List";
import RelationshipItem from "./RelationshipItem";

function RelationshipList({ items, currentUserId, onFollowClick }) {
  return (
    <VerticalList className="list-group-flush">
      {items && items.map(item => (
        <RelationshipItem
          key={item?.id}
          id={item?.id}
          userId={item?.userId}
          avatarUrl={item?.userUrl}
          username={item?.userName}
          isFollowing={item?.isFollowing}
          me={item?.userId === currentUserId}
          onFollowClick={onFollowClick} />
      ))}
    </VerticalList>
  )
}

RelationshipList.propTypes = {
  items: PropTypes.array,
  currentUserId: PropTypes.string,
  onFollowClick: PropTypes.func
}

RelationshipList.defaultProps = {
  items: [],
  currentUserId: "",
  onFollowClick: undefined
};

export default RelationshipList;