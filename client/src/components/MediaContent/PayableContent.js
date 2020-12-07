import React from "react";
import PropTypes from "prop-types";

import {formatCurrency} from "../../helpers/functions";

import { Box, Chip, Avatar } from "@material-ui/core";
import LockIcon from "@material-ui/icons/LockOutlined";
import MoneyIcon from "@material-ui/icons/MonetizationOn";

import useStyles from "./styles";

export default function PayableContent({ amount, items, children, onPayClick }) {
  const classes = useStyles();

  if(amount == 0) {
    return <>{children}</>
  } else {
    return (
      <Box className={classes.payable}>
        <LockIcon className="lock" />
        <Chip icon={<MoneyIcon style={{"color": "gold"}} />} label={`Price ${formatCurrency(amount)}`} onClick={onPayClick} />
        {children ?? <></>}
      </Box>
    );
  }
}

PayableContent.propTypes = {
  amount: PropTypes.number,
};

PayableContent.defaultProps = {
  amount: 0,
};
