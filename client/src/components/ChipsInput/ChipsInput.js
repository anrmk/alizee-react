import React, { useState, useEffect } from "react";
import clsx from 'clsx';
import { Box, Typography, Chip } from '@material-ui/core';

import CustomInput from "../../components/CustomInput";
import useStyles from "./styles";

function ChipsInput({ 
  items = [],
  value = "",
  error = null,
  filters = [],
  max,
  classChipName,

  onChange,
  onError,

  ...rest
}) {
  const classes = useStyles();
  const [localItems, setLocalItems] = useState(items);
  const [localValue, setLocalValue] = useState(value);
  const [localError, setLocalError] = useState(error);

  useEffect(() => {
    onChange && onChange(localItems);
  }, [localItems])

  useEffect(() => {
    onError && onError(localError);
  }, [localError])

  const handleKeyDown = evt => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();

      const val = localValue.trim();

      if (val && isValid(val)) {
        setLocalItems([...localItems, val]);
        setLocalValue("");
      }
    }
  };

  const handleChange = e => {
    setLocalValue(e.target.value);
    setLocalError(null)
  };

  const handleDelete = item => {
    setLocalItems(localItems.filter(i => i !== item));
  };

  const isValid = val => {
    let err = null;

    filters.forEach(filter => {
      const message = filter(val, localItems);

      if (message) {
        err = message;
      }
    })

    if (isInList(val)) {
      err = `${val} has already been added.`;
    }

    if (max && localItems.length >= max) {
      err = `${max} items limit.`;
    }

    if (err) {
      setLocalError(err);

      return false;
    }

    return true;
  }

  const isInList = (email) => {
    return localItems.includes(email);
  }

  return (
    <Box className={classes.root}>
      <Box>
        {localItems.map(itemId => (
          <Chip className={clsx(classes.chip, classChipName)} key={itemId} label={itemId} onDelete={() => handleDelete(itemId)} />
        ))}
      </Box>

        <CustomInput
          {...rest}
          type="text"
          value={localValue}
          error={!!localError}
          helperText={localError}
          onChange={handleChange}
          onKeyDown={handleKeyDown} />

        {max > 0 && <Typography variant="caption">{localItems.length}/{max}</Typography>}
    </Box>
  )
}

export default ChipsInput;
