import React from "react";
import { useTranslation } from "react-i18next";

import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
} from "@material-ui/core";

import LockIcon from "@material-ui/icons/LockOutlined";

import useStyles from "./styles";

export default function GridGalleryStub({ onSubscribeClick }) {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <Box className={classes.stubRoot} width="100%" height="200px">
      <Card>
        <CardContent className={classes.stubCardContent}>
          <IconButton onClick={onSubscribeClick}>
            <LockIcon fontSize="large" />
          </IconButton>
          <Typography>
            {t("ProfileContentGridGalleryStubTextSubscribeToSeePosts")}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
