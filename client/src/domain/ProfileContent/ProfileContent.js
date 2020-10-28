import React from "react";
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';

import GridGallery from "../GridGallery";

import "./ProfileContent.scss";

function ProfileContent({ 
  media,
  hasMore,

  onFetchMore,
  onTabSelect
}) {
  return (
    <div className="profile-content">
      <Tabs 
        className="justify-content-center"
        defaultActiveKey="posts"
        transition={false}
        onSelect={onTabSelect}>
        <Tab className="p-3" eventKey="posts" title="Posts">
          <GridGallery items={media} hasMore={hasMore} onFetchMore={onFetchMore} />
        </Tab>
        <Tab className="p-3" eventKey="tagged" title="Tagged">
        </Tab>
      </Tabs>
    </div>
  );
}

ProfileContent.propTypes = {
  media: PropTypes.array,
  hasMore: PropTypes.bool,

  onFetchMore: PropTypes.func,
  onTabSelect: PropTypes.func
}

ProfileContent.defaultProps = {
  media: [],
  hasMore: false,

  onFetchMore: undefined,
  onTabSelect: undefined
};

export default ProfileContent;
