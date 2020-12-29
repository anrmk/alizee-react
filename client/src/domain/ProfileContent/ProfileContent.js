import React from "react";
import PropTypes from "prop-types";

import PostTabs from "./PostTabs"
import GridGallery from "../GridGallery";

function ProfileContent({
  isOwner,
  items,
  hasMore,
  tabIndex,

  onFetchMore,
  onTabChange,
  onItemClick,
}) {
  return (
    <PostTabs isOwner={isOwner} index={tabIndex} onTabChange={onTabChange} >
      <GridGallery
        items={items}
        hasMore={hasMore}
        onFetchMore={onFetchMore}
        onItemClick={onItemClick}
      />
    </PostTabs>
  );
}

ProfileContent.propTypes = {
  isOwner: PropTypes.bool,
  items: PropTypes.array,
  hasMore: PropTypes.bool,

  onFetchMore: PropTypes.func,
  onTabChange: PropTypes.func,
  onTabSelect: PropTypes.func,
};

ProfileContent.defaultProps = {
  isOwner: false,
  items: [],
  hasMore: false,

  onFetchMore: undefined,
  onTabChange: undefined,
  onTabSelect: undefined,
};

export default ProfileContent;
