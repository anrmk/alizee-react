import React from "react";
import { useTranslation } from "react-i18next";

import { Box, Tabs, Tab } from "@material-ui/core";

// import GridIcon from "@material-ui/icons/GridOnOutlined";
// import StarIcon from "@material-ui/icons/Star";
// import TaggedIcon from "@material-ui/icons/LabelOutlined";

import useStyles from "./styles";

function PostTabs({
  isOwner,
  index,
  disabled,

  onTabChange,
}) {
  const classes = useStyles();
  const { t } = useTranslation();

  const handleChange = (_, newValue) => {
    onTabChange && onTabChange(newValue);
  };

  return (
    <Box marginBottom={1} className={classes.tabsWrapper}>
      <Tabs value={index} onChange={handleChange} variant="fullWidth" centered>
        <Tab label={t("ProfileProfileContentPostsTabLabel")} disabled={disabled} />
        <Tab label={t("ProfileProfileContentTaggedTabLabel")} disabled={disabled} />
        {isOwner && <Tab label={t("ProfileProfileContentFavoritesTabLabel")} disabled={disabled} />}
      </Tabs>
    </Box>
  );
}

export default PostTabs;
