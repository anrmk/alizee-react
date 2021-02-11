import React from "react";

import PostTabs from "./PostTabs";
import GridGallery from "../GridGallery";

function ProfileContent(props) {
  const { isOwner, items, hasMore, tabIndex, disabled } = props;
  const { onFetchMore, onTabChange, onItemClick } = props;

  return (
    <>
      <PostTabs isOwner={isOwner} index={tabIndex} onTabChange={onTabChange} disabled={disabled} />
      <GridGallery items={items} hasMore={hasMore} onFetchMore={onFetchMore} onItemClick={onItemClick} />
    </>
  );
}

export default ProfileContent;
