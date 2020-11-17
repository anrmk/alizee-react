import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { formatNumber } from "../../helpers/functions";
import { FOLLOWERS_ROUTE, FOLLOWINGS_ROUTE } from "../../constants/routes";

import { List, ListItem } from "@material-ui/core";

import useStyle from "./styles";

function Statistics({ username, postsCount, followersCount, followingCount }) {
  const classes = useStyle();

  return (
    <List className={classes.statistics}>
      <ListItem>{formatNumber(postsCount)} posts</ListItem>
      <ListItem>
        <Link to={FOLLOWERS_ROUTE(username)}>{formatNumber(followersCount)} followers</Link>
      </ListItem>
      <ListItem>
        <Link to={FOLLOWINGS_ROUTE(username)}>{formatNumber(followingCount)} following</Link>
      </ListItem>
    </List>
  );
}

Statistics.propTypes = {
  username: PropTypes.string,
  postsCount: PropTypes.number,
  followersCount: PropTypes.number,
  followingCount: PropTypes.number,
};

Statistics.defaultProps = {
  username: "",
  postsCount: 0,
  followersCount: 0,
  followingCount: 0,
};

export default Statistics;
