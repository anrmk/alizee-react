import React from "react";
import PropTypes from "prop-types";

import {Tabs, Tab} from "@material-ui/core";

import GridIcon from "@material-ui/icons/GridOnOutlined";
import FeelingsIcon from "@material-ui/icons/EmojiEmotionsOutlined";
import TaggedIcon from "@material-ui/icons/LabelOutlined";

import useStyles from "./styles";

function PostTabs({
  children,
  onTabChange
}) {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChange = (e, newValue) => {
    setTabIndex(newValue);
    onTabChange && onTabChange(newValue);
  };

  return (
    <>
      <Tabs
        className={classes.tabs}
        centered
        value={tabIndex}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
      >
        <Tab icon={<GridIcon />} label="POSTS" />
        <Tab icon={<FeelingsIcon />} label="FEELINGS" />
        <Tab icon={<TaggedIcon />} label="TAGGED" />
      </Tabs>
      {children}
    </>
  );
}

PostTabs.propTypes = {
  media: PropTypes.array,
  hasMore: PropTypes.bool,

  onTabChange: PropTypes.func,
};

PostTabs.defaultProps = {
  media: [],
  hasMore: false,

  onTabChange: undefined,
};

export default PostTabs;
