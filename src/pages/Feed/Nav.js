import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Typography, IconButton } from "@material-ui/core";

import SearchIcon from "@material-ui/icons/SearchOutlined";

import useStyles from "./styles";
import { SEARCH_ROUTE } from "../../constants/routes";

export default function Nav() {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <Box className={classes.navRoot}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">{t("SidebarFeedText")}</Typography>
        <IconButton to={SEARCH_ROUTE} component={Link}>
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
