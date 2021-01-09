import React from "react";
import PropTypes from "prop-types";

import PostTabs from "./PostTabs";
import GridGallery from "../GridGallery";

function ProfileContent(props) {
  const { isOwner, items, hasMore, tabIndex, disabled } = props;
  const { onFetchMore, onTabChange, onItemClick } = props;

  return (
    <PostTabs isOwner={isOwner} index={tabIndex} onTabChange={onTabChange} disabled={disabled}>
      <GridGallery items={items} hasMore={hasMore} onFetchMore={onFetchMore} onItemClick={onItemClick} />
    </PostTabs>
  );
}

ProfileContent.propTypes = {
  isOwner: PropTypes.bool,
  items: PropTypes.array,
  hasMore: PropTypes.bool,
  disabled: PropTypes.bool,

  onFetchMore: PropTypes.func,
  onTabChange: PropTypes.func,
  onTabSelect: PropTypes.func,
};

ProfileContent.defaultProps = {
  isOwner: false,
  items: [],
  hasMore: false,
  disabled: true,

  onFetchMore: undefined,
  onTabChange: undefined,
  onTabSelect: undefined,
};

export default ProfileContent;
