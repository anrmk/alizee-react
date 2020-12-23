import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import {Tabs, Tab} from "@material-ui/core";

import GridIcon from "@material-ui/icons/GridOnOutlined";
import StarIcon from "@material-ui/icons/Star";
import TaggedIcon from "@material-ui/icons/LabelOutlined";

import useStyles from "./styles";

function PostTabs({
  index,
  children,
  onTabChange
}) {
  const classes = useStyles();
  const { t } = useTranslation();

  const handleChange = (e, newValue) => {
    onTabChange && onTabChange(newValue);
  };

  return (
    <>
      <Tabs
        className={classes.tabs}
        centered
        value={index}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="secondary"
      >
        <Tab icon={<GridIcon />} label={t("ProfileProfileContentPostsTabLabel")} />
        <Tab icon={<StarIcon />} label={t("ProfileProfileContentFavoritesTabLabel")} />
        <Tab icon={<TaggedIcon />} label={t("ProfileProfileContentTaggedTabLabel")} />
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
