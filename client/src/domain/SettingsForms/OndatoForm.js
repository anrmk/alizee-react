import React from "react";
//import {Link} from "react-router-dom";

import { Grid, Button, Typography, Link } from "@material-ui/core";
import { ONDATO_ROUTE } from "../../constants/routes";

import useAgreeDialog from "../../hooks/useAgreeDialog";

function OndatoForm() {
  const agreeDialog = useAgreeDialog((data) => {
    window.open(ONDATO_ROUTE, "_blank");
  });

  return (
    <Grid container variant="column" spacing={2}>
      <Grid item>
        <Typography>
          We recommend using mobile device or device with camera to complete this verification step
        </Typography>
      </Grid>
      <Grid item>
        <Button disableElevation variant="contained" color="primary" onClick={agreeDialog.toggle}>
          Complete Verification
        </Button>
      </Grid>
    </Grid>
  );
}

export default OndatoForm;
