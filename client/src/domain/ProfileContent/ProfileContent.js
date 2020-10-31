import React from "react";
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'react-bootstrap';

import PhotoLibraryIcon from "@material-ui/icons/PhotoLibraryRounded";

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
      <ul class="nav justify-content-center">
        <li class="nav-item">
          <a class="nav-link" href="#"><PhotoLibraryIcon fontSize="2"/> Posts</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"><PhotoLibraryIcon /> Tags</a>
        </li>
      </ul>

      <GridGallery items={media} hasMore={hasMore} onFetchMore={onFetchMore} />
      {/* <Tabs 
        className="justify-content-center"
        defaultActiveKey="posts"
        transition={false}
        onSelect={onTabSelect}>
        <Tab eventKey="posts" title="Posts">
          
        </Tab>
        <Tab eventKey="tagged" title="Tagged">
        </Tab>
      </Tabs> */}
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
