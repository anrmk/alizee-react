import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { Box, IconButton } from "@material-ui/core";
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';

import useStyles from "./styles";

function ArrowButtons({
  length,
  currentIndex,

  onChangeIndex
}) {
  const classes = useStyles();
  const [localIndex, setLocalIndex] = useState(currentIndex);

  useEffect(() => {
    if (currentIndex) {
      setLocalIndex(currentIndex);
    }
  }, [currentIndex])

  const handleIndexChange = (e, count) => {
    e.stopPropagation();
    let index;
    if (count >= 0 && count < length) {
      index = count;
    } else if (count < 0) {
      index = length - 1;
    } else if (count >= length) {
      index = 0;
    }
    setLocalIndex(index);
    onChangeIndex && onChangeIndex(index);
  };

  return (
    <Box className={classes.arrowButtonBox} px={2} display="inline-flex">
      <IconButton onClick={(e) => handleIndexChange(e, localIndex - 1)}><ArrowBackIosRoundedIcon className={classes.arrowButton} fontSize="large" /></IconButton>
      <IconButton onClick={(e) => handleIndexChange(e, localIndex + 1)}><ArrowForwardIosRoundedIcon className={classes.arrowButton} fontSize="large" /></IconButton>
    </Box>
  );
}

ArrowButtons.propTypes = {
  length: PropTypes.number,
  currentIndex: PropTypes.number,

  onChangeIndex: PropTypes.func,
};

ArrowButtons.defaultProps = {
  length: 0,
  currentIndex: 0,

  onChangeIndex: undefined,
};

export default ArrowButtons;
