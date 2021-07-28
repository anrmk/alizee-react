import React from "react";
import { Box, Card, CardContent, Typography } from "@material-ui/core";
import HelpRoundedIcon from "@material-ui/icons/HelpRounded";

import useStyles from "./styles";

export default function OnlyModalCard({ textContent }) {
  const classes = useStyles();

  return (
    <Card className={classes.onlyModalRoot}>
      <CardContent className={classes.onlyModalContent}>
        <Box marginBottom={10}>
          <HelpRoundedIcon className={classes.onlyModalIcon} />
        </Box>
        <Typography variant="h6" component="h6" gutterBottom>
          {textContent}
        </Typography>
      </CardContent>
    </Card>
  );
}
