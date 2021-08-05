import React from "react";

import {
  Grid,
  Divider,
  Button,
  Typography,
  CardContent,
  List,
} from "@material-ui/core";

import Bundle from "../../components/Bundle.js/Bundle";

function BundleBlog({ onOpenDialogClick, price, data, onBundleDelete }) {
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
              disabled={price < 0.1}
              disableElevation
              variant="outlined"
              color="primary"
              onClick={onOpenDialogClick}>
              Create Bundle
            </Button>
          </Grid>
        </Grid>
      </CardContent>
      {data?.length > 0 && (
        <>
          <Divider />
          <CardContent>
            <List dense>
              {data.map((item) => (
                <Bundle
                  isOwner
                  key={item.duration}
                  id={item.id}
                  onDelete={handleDeleteClick}
                  duration={item.duration}
                  discount={item.discount}
                  price={price}
                />
              ))}
            </List>
          </CardContent>
        </>
      )}
    </>
  );
}

export default BundleBlog;
