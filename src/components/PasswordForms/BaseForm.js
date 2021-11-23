import React from "react";
import { Box, Card, CardContent, Typography, Button } from "@material-ui/core";

import useStyles from "./styles";

const BaseForm = ({
  title,
  icon,
  helperText,
  btnText,
  btnDisabled,
  children,
  footerComponent,

  onSubmit,
}) => {
  const classes = useStyles();

  return (
    <Card>
      <CardContent className={classes.content}>
        <Box className={classes.circleIcon}>{icon}</Box>
        <Typography variant="h6" component="h6" gutterBottom>
          {title}
        </Typography>
        <Typography
          className={classes.captionText}
          variant="caption"
          component="span"
          gutterBottom>
          {helperText}
        </Typography>
        <form onSubmit={onSubmit}>
          {children}
          <Button
            fullWidth
            className={classes.formElementIndent}
            disableElevation
            type="submit"
            size="large"
            color="primary"
            variant="contained"
            disabled={btnDisabled}>
            {btnText}
          </Button>
          {footerComponent}
        </form>
      </CardContent>
    </Card>
  );
};

export default BaseForm;
