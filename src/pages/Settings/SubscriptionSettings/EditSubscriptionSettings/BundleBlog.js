import React from "react";

import { Grid, Button, Typography, CardContent } from "@material-ui/core";

import { BundleList } from "../../../../components/Bundle";

function BundleBlog({
  onOpenDialogClick,
  price = 0,
  data,
  disabled,
  onBundleDelete,
}) {
  const handleDeleteClick = (id) => {
    onBundleDelete(
      id,
      "Delete bundle",
      true,
      "Do you really want to delete the bundle?"
    );
  };

  return (
    <>
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h6">Following bundles</Typography>
            <Typography variant="caption" color="textSecondary">
              Offer several months of subscription as a discounted bundle
            </Typography>
          </Grid>

          <Grid item>
            <Button
              disabled={disabled}
              disableElevation
              variant="contained"
              color="primary"
              onClick={onOpenDialogClick}>
              Create Bundle
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      {data?.length > 0 && (
        <BundleList
          isOwner
          price={price}
          disabled={disabled}
          data={data}
          onDelete={handleDeleteClick}
        />
      )}
    </>
  );
}

export default BundleBlog;
