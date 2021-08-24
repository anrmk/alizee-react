import React from "react";

import { Grid, Button, Typography, CardContent } from "@material-ui/core";

import { CampaignList } from "../../components/Campaign";

function CampaignBlog({
  onOpenDialogClick,
  price = 0,
  data,
  userName,
  onCampaignDelete,
}) {
  const handleDeleteClick = (id) => {
    onCampaignDelete(id, "Stop promotion campaign", false);
  };
  return (
    <>
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h6">Profile promotion campaign</Typography>
            <Typography variant="body2">
              Offer a free trial or a discounted subscription on your profile
              for a limited number of new or already expired subscribers
            </Typography>
          </Grid>
          <Grid item>
            <Button
              onClick={onOpenDialogClick}
              disableElevation
              variant="contained"
              color="primary"
              disabled={price < 0.1}>
              Create Campaign
            </Button>
          </Grid>
        </Grid>
      </CardContent>

      {data && data.length > 0 && (
        <CampaignList
          data={data}
          userName={userName}
          onDelete={handleDeleteClick}
        />
      )}
    </>
  );
}

export default CampaignBlog;
