import React from "react";
import {
  CardContent,
  Typography,
  Box,
  CardMedia,
  Button,
} from "@material-ui/core/";

import Visa from "../../assets/img/cards/visa.png";
import MasterCard from "../../assets/img/cards/mastercard.png";
import Maestro from "../../assets/img/cards/maestro.png";
import DinersClub from "../../assets/img/cards/diners_club.png";
import Discover from "../../assets/img/cards/discover.png";
import JCB from "../../assets/img/cards/jcb.png";

import useStyles from "./styles";
import { customFormatDate } from "../../helpers/functions";

function CardItem({
  id,
  type = "visa",
  name,
  expDate,
  number,
  isDefault,
  isVerified,
  clickable = true,
  dateOptions,

  onClick,
  onDelete,
  onVerifyClick,
}) {
  const classes = useStyles();

  const setTypeCard = () => {
    switch (type.toLowerCase()) {
      case "visa":
        return Visa;
      case "mastercard":
        return MasterCard;
      case "maestro":
        return Maestro;
      case "dinersclub":
        return DinersClub;
      case "discover":
        return Discover;
      case "jcb":
        return JCB;

      default:
        return Visa;
    }
  };

  return (
    <Box>
      <CardContent
        className={`${classes.card} ${isVerified ? null : classes.verified} ${
          isDefault ? classes.isDefault : null
        }`}>
        <CardMedia
          className={classes.image}
          src={setTypeCard()}
          alt="card-img"
          component="img"
        />

        <Typography align="center" variant="h5">
          {number}
        </Typography>

        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          alignItems="center"
          mt={2}>
          <Box>
            <Typography variant="caption" color="textSecondary" align="center">
              cardholder name
            </Typography>
            <Typography variant="body1">{name}</Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="textSecondary">
              expiration
            </Typography>
            <Typography variant="body1" align="right">
              {customFormatDate(expDate, dateOptions)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <Box mt={1} display="flex" justifyContent="space-between">
        {!isVerified && !isDefault && (
          <Button
            disableElevation
            disabled={!clickable}
            color="primary"
            variant="contained"
            size="small"
            onClick={(e) => {
              onVerifyClick && onVerifyClick(id);
            }}>
            Verify card
          </Button>
        )}
        {isVerified && !isDefault && (
          <Button
            size="small"
            color="primary"
            variant="contained"
            onClick={() => {
              onClick(id);
            }}>
            Make default
          </Button>
        )}
        <Button
          disableElevation
          color="primary"
          size="small"
          variant="contained"
          onClick={(e) => {
            onDelete && onDelete(id);
          }}>
          Delete card
        </Button>
      </Box>
    </Box>
  );
}

export default CardItem;
