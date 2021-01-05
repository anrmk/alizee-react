import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import { Tabs, Tab } from "@material-ui/core";

import GridIcon from "@material-ui/icons/GridOnOutlined";
import StarIcon from "@material-ui/icons/Star";
import TaggedIcon from "@material-ui/icons/LabelOutlined";

import useStyles from "./styles";

function PostTabs(props) {
  const classes = useStyles();
  const { t } = useTranslation();

  const { isOwner, index, children, disabled } = props;
  const {onTabChange} = props;

  const handleChange = (e, newValue) => {
    onTabChange && onTabChange(newValue);
  };

  return (
    <>
      <Tabs className={classes.tabs} centered value={index} onChange={handleChange} >
        <Tab icon={<GridIcon />} label={t("ProfileProfileContentPostsTabLabel")} disabled={disabled} />
        <Tab icon={<TaggedIcon />} label={t("ProfileProfileContentTaggedTabLabel")} disabled={disabled} />
        {isOwner && <Tab icon={<StarIcon />} label={t("ProfileProfileContentFavoritesTabLabel")} disabled={disabled} />}
      </Tabs>
      {children}
    </>
  );
}

PostTabs.propTypes = {
  isOwner: PropTypes.bool,
  media: PropTypes.array,
  hasMore: PropTypes.bool,
  disable: PropTypes.bool,

  onTabChange: PropTypes.func,
};

PostTabs.defaultProps = {
  isOwner: false,
  media: [],
  hasMore: false,
  disable: true,

  onTabChange: undefined,
};

export default PostTabs;
