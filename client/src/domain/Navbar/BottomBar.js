import React from "react";
import { useHistory } from "react-router-dom";
import clsx from "clsx";

import { AppBar, BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/SearchOutlined";
import HomeIcon from "@material-ui/icons/HomeOutlined";
import ExploreIcon from "@material-ui/icons/ExploreOutlined";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";

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

  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case "home":
        history.push(HOME_ROUTE);
        break;
      case "search":
        history.push(SEARCH_ROUTE);
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
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction value="home" label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction value="search" label="Search" icon={<SearchIcon />} />
        <BottomNavigationAction
          value="post"
          icon={
            <PostSprout
              onCreatePost={onCreatePost}
              onCreateStory={onCreateStory}
              onCreateMood={handleCreateMoodClick}
            />
          }
        />
        <BottomNavigationAction value="explore" label="Explore" icon={<ExploreIcon />} />
        <BottomNavigationAction value="profile" label="Me" icon={<PersonOutlinedIcon />} />
      </BottomNavigation>
    </AppBar>
  );
}

export default BottomBar;
