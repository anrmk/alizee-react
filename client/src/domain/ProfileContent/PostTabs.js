import React from "react";
import { useTranslation } from "react-i18next";

import { Box, Tabs, Tab } from "@material-ui/core";


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
      <Tabs value={index} onChange={handleChange} variant="fullWidth" centered >
        <Tab label={t("ProfileProfileContentPostsTabLabel")} disabled={disabled} className={classes.tab}/>
        <Tab label={t("ProfileProfileContentTaggedTabLabel")} disabled={disabled} className={classes.tab}/>
        {isOwner && <Tab label={t("ProfileProfileContentSavedTabLabel")} disabled={disabled} className={classes.tab}/>}
      </Tabs>
    </Box>
  );
}

export default PostTabs;
