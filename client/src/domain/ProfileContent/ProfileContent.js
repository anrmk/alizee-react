import React from "react";
import PropTypes from "prop-types";

import PostTabs from "./PostTabs"
import GridGallery from "../GridGallery";

function ProfileContent({
  media,
  hasMore,

  onFetchMore,
  onTabChange,
  onItemClick,
}) {
  return (
    <PostTabs onTabChange={onTabChange} >
      <GridGallery
        items={media}
        hasMore={hasMore}
        onFetchMore={onFetchMore}
        onItemClick={onItemClick}
      />
    </PostTabs>
  );
}

ProfileContent.propTypes = {
  media: PropTypes.array,
  hasMore: PropTypes.bool,

  onFetchMore: PropTypes.func,
  onTabChange: PropTypes.func,
  onTabSelect: PropTypes.func,
};

ProfileContent.defaultProps = {
  media: [],
  hasMore: false,

  onFetchMore: undefined,
  onTabChange: undefined,
  onTabSelect: undefined,
};

export default ProfileContent;
