import React from "react";
import PropTypes from 'prop-types';
import List from "@material-ui/core/List";

import RelationshipItem from "./RelationshipItem";

function RelationshipList({ items, currentUserId, onFollowClick }) {
  return (
    <List>
      {items && items.map(item => (

        <RelationshipItem
          key={item?.id}
          id={item?.id}
          userId={item?.userId}
          avatarUrl={item?.avatarUrl}
          username={item?.userName}
          isFollowing={item?.isFollowing}
          me={item?.userId === currentUserId}
          onFollowClick={onFollowClick} />
      ))}
    </List>
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
