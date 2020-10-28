import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { formatNumber } from "../../helpers/functions";
import { HOME_ROUTE, FOLLOWERS_ROUTE, FOLLOWINGS_ROUTE } from "../../constants/routes";

function Statistics({
  username,
  postsCount,
  followersCount,
  followingCount
}) {
  return (
    <div className="d-flex mt-4 justify-content-center justify-content-lg-start text-center">
      <Link to={HOME_ROUTE} className="not-link">
        <p className="m-0"><strong>{formatNumber(postsCount)}</strong> posts</p>
      </Link>
      <Link to={FOLLOWERS_ROUTE(username)} className="not-link">
        <p className="m-0 ml-4"><strong>{formatNumber(followersCount)}</strong> followers</p>
      </Link>
      <Link to={FOLLOWINGS_ROUTE(username)} className="not-link">
        <p className="m-0 ml-4"><strong>{formatNumber(followingCount)}</strong> following</p>
      </Link>
    </div>
  );
}

Statistics.propTypes = {
  username: PropTypes.string,
  postsCount: PropTypes.number,
  followersCount: PropTypes.number,
  followingCount: PropTypes.number
}

Statistics.defaultProps = {
  username: "",
  postsCount: 0,
  followersCount: 0,
  followingCount: 0
};

export default Statistics;
