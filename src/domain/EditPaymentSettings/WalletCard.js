import React, { useState, useEffect } from "react";
import {
  CardContent,
  CardHeader,
  Grid,
  Switch,
  Button,
  Typography,
  Box,
  Card,
  FormControlLabel,
} from "@material-ui/core/";

import useStyles from "./styles";

function WalletCardSettings({
  isDefault = false,
  total = 0,
  onDialogOpen,
  onUpdateWallet,
}) {
  const classes = useStyles();

  const [lWalletCard, setLWalletCard] = useState(isDefault);

  useEffect(() => {
    setLWalletCard(isDefault);
  }, [isDefault]);

  const handleUpdateWallet = (e) => {
    const { checked } = e.target;
    setLWalletCard(checked);
    onUpdateWallet && onUpdateWallet(checked);
  };

  return (
    <Card>
      <CardHeader
        title={
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1" align="left">
              WALLET CREDITS
            </Typography>
            <Typography variant="body1" align="right">
              {total}
            </Typography>
          </Box>
        }
      />
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="baseline">
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" align="left" color="textSecondary">
              Make wallet primary method for rebills
            </Typography>
          </Grid>

          <Grid item>
            <FormControlLabel
              control={
                <Switch
                  onChange={handleUpdateWallet}
                  name="isDefault"
                  color="primary"
                  checked={lWalletCard}
                />
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="primary"
              onClick={onDialogOpen}
              disableElevation>
              Add a payment card
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default WalletCardSettings;
