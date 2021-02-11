import React from "react";
import { useHistory } from "react-router-dom";

import { Typography, BottomNavigation, BottomNavigationAction, Divider } from "@material-ui/core/";
import { FOLLOWERS_ROUTE, FOLLOWINGS_ROUTE, FAVORITES_USERNAME_ROUTE } from "../../constants/routes";

import useStyles from "./style";

function Navigation({userName, followersCount, followingsCount, favoritesCount }) {
  const history = useHistory();
  const classes = useStyles();

  const handleFavoritesClick = () => {
    history.push(FAVORITES_USERNAME_ROUTE(userName));
  }

  const handleFollowingClick = () => {
    history.push(FOLLOWINGS_ROUTE(userName));
  };

  const handleFollowersClick = () => {
    history.push(FOLLOWERS_ROUTE(userName));
  };

  return (
    <BottomNavigation showLabels className={classes.navigation}>
      <BottomNavigationAction
        label="Followers"
        disabled={!followersCount}
        onClick={() => handleFollowersClick()}
        icon={<Typography>{followersCount || "0"}</Typography>}
      />
      <BottomNavigationAction
        label="Following"
        disabled={!followingsCount}
        onClick={() => handleFollowingClick()}
        icon={<Typography>{followingsCount || "0"}</Typography>}
      />
      <BottomNavigationAction
        label="Favorites"
        disabled={!favoritesCount}
        onClick={() => handleFavoritesClick()}
        icon={<Typography>{favoritesCount || "0"}</Typography>}
      />
    </BottomNavigation>
  );
}

export default Navigation;
