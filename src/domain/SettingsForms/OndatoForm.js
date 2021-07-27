import React from "react";

import { Grid, Button, Typography } from "@material-ui/core";

function OndatoForm({onSubmit}) {
   return (
     <Grid container variant="column" spacing={2}>
       <Grid item>
         <Typography>
           We recommend using mobile device or device with camera to complete this verification step
         </Typography>
       </Grid>
       <Grid item>
         <Button disableElevation variant="contained" color="primary" onClick={onSubmit}>
           Complete Verification
         </Button>
       </Grid>
     </Grid>
   );
}

export default OndatoForm;
