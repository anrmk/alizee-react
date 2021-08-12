import { Grid } from "@material-ui/core";
import React from "react";

import Visa from "../assets/img/cards/visa.png";
import MasterCard from "../assets/img/cards/mastercard.png";
import Maestro from "../assets/img/cards/maestro.png";
import DinersClub from "../assets/img/cards/diners_club.png";
import Discover from "../assets/img/cards/discover.png";
import JCB from "../assets/img/cards/jcb.png";

function CreditCards() {
  const cards = [Visa, MasterCard, Maestro, DinersClub, Discover, JCB];
  return (
    <Grid container justifyContent="center">
      {cards.map((url, index) => (
        <Grid item key={index}>
          <img src={url} width="48px" alt="card-img" />
        </Grid>
      ))}
    </Grid>
  );
}

export default CreditCards;
