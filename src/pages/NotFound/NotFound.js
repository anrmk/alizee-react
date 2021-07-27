import React from "react";

import { Container, Box, Typography, Button } from "@material-ui/core";
import { HOME_ROUTE } from "../../constants/routes";
import imageUrl from "../../../src/assets/img/404-image.svg";

export default function NotFound() {
  return (
    <Box display="flex" textAlign="center" height="100vh" alignItems="center" justifyContent="center">
      <Container>
        <img src={imageUrl} alt="" />
        <Typography variant="h4" gutterBottom>
          Sorry, this page isn't available.
        </Typography>
        <Typography variant="body1" color="textSecondary" gutterBottom>
          The link you followed may be broken, or the page may have been removed.{" "}
        </Typography>

        <Button variant="contained" color="secondary" href={HOME_ROUTE}>
          Go back to home
        </Button>
      </Container>
    </Box>
  );
}
