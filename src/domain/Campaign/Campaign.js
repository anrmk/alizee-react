import React from "react";
import {
  CardContent,
  CardHeader,
  Divider,
  Box,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";

import { customFormatDate } from "../../helpers/functions";

import { DISCOUNT_MONTH_TYPE_RADIO_ID } from "../../constants/campaign";

import useStyles from "./styles";

function Campaign(props) {
  const classes = useStyles();

  const data = {
    ...props,
  };

  const { onDelete } = props;

  const generateText = () => {
    switch (data.subscribersType) {
      case 2:
        return "For expired and new subscribers";

      case 1:
        return "For expired subscribers";

      default:
        return "For new subscribers";
    }
  };
  return (
    <>
      <CardHeader
        title={`${data.limit > 0 ? "Limited" : "No limited"} offer - ${
          data.type === DISCOUNT_MONTH_TYPE_RADIO_ID
            ? `${data.discount}% off`
            : "Free trial"
        } for ${data.duration} days!`}
        subheader={
          <Box display="flex">
            <Typography variant="body2">{generateText()}</Typography>
            <Divider
              orientation="vertical"
              flexItem
              className={classes.divider}
            />
            <Typography variant="body2">Claims {data.claimsCount}</Typography>
            {data.limit > 0 && (
              <>
                <Divider
                  orientation="vertical"
                  flexItem
                  className={classes.divider}
                />
                <Typography variant="body2">
                  Left {data.limit - data.claimsCount}
                </Typography>
              </>
            )}
          </Box>
        }
      />

      <CardContent>
        <Box display="flex" justifyContent="space-between" mb={1}>
          <Typography variant="body2">Started</Typography>
          <Typography variant="body2">
            {customFormatDate(data.createdDate)}
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" justifyContent="space-between" mt={1} mb={2}>
          <Typography variant="body2">Ends</Typography>
          <Typography variant="body2">
            {data.endDate
              ? customFormatDate(data.endDate)
              : "Not expiration days"}
          </Typography>
        </Box>

        <Grid container spacing={1}>
          <Grid item>
            <Button
              onClick={() => onDelete(data.id)}
              variant="contained"
              color="primary"
              startIcon={<HighlightOffIcon />}>
              Stop promotion
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </>
  );
}

export default Campaign;
