import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import clsx from "clsx";

import { AppBar, BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import ExploreIcon from "@material-ui/icons/ExploreOutlined";
import AddCircleIcon from "@material-ui/icons/AddCircleOutline";
import AccountIcon from "@material-ui/icons/AccountCircleOutlined";

import { PostSprout } from "../PostsList";

import { HOME_ROUTE, SEARCH_ROUTE, EXPLORE_ROUTE, PROFILE_USERNAME_ROUTE } from "../../constants/routes";

import useStyles from "./styles";

function BottomBar({
  user,

  onCreatePost,
  onCreateStory,
  onCreateMood,
}) {
  const classes = useStyles()();
  const history = useHistory();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [value, setValue] = React.useState("recents");

  const handleChange = (e, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case "home":
        history.push(HOME_ROUTE);
        break;
      case "search":
        history.push(SEARCH_ROUTE);
        break;
      case "post":
        setDrawerOpen(true);
        break;
      case "explore":
        history.push(EXPLORE_ROUTE);
        break;
      case "profile":
        history.push(PROFILE_USERNAME_ROUTE(user.userName));
        break;
      default:
        return;
    }
  };

  const handleCreateMoodClick = () => {
    onCreateMood && onCreateMood({ ...user, defaultValue: user.mood });
  };

  return (
    <AppBar className={clsx(classes.root, "bottom")} component="footer">
      <BottomNavigation value={value} onChange={handleChange} showLabels={false}>
        <BottomNavigationAction value="home" icon={<HomeIcon />} />
        <BottomNavigationAction value="search" icon={<SearchIcon />} />
        <BottomNavigationAction value="post" icon={<AddCircleIcon fontSize="large" />} />
        <BottomNavigationAction value="explore" icon={<ExploreIcon />} />
        <BottomNavigationAction value="profile" icon={<AccountIcon />} />
      </BottomNavigation>

      <PostSprout
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onCreatePost={onCreatePost}
        onCreateStory={onCreateStory}
        onCreateMood={handleCreateMoodClick}
      />
    </AppBar>
  );
}

export default BottomBar;
