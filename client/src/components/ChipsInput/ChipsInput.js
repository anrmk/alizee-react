import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Box, Chip, TextField, Typography } from "@material-ui/core";

import useStyles from "./styles";

const BACKSPACE_KEY_CODE = 8;

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
  const [localItems, setLocalItems] = useState(items);
  const [localValue, setLocalValue] = useState(value);
  const [localError, setLocalError] = useState(error);
  const classes = useStyles({localItems});

  useEffect(() => {
    if (max > 0) {
      setLocalItems(items.slice(0, max));
    }
  }, []);

  useEffect(() => {
    onChange && onChange(localItems);
  }, [localItems]);

  useEffect(() => {
    if (localError) {
      onError && onError(localError);
    }
  }, [localError]);

  const handleKeyDown = (evt) => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();

      const val = localValue.trim();

      if (val && isValid(val)) {
        setLocalItems([...localItems, val]);
        setLocalValue("");
      }
    } else if (evt.keyCode === BACKSPACE_KEY_CODE && !rest?.inputProps?.readOnly) {
      !localValue.length && localItems.length > 0 &&
        setLocalItems(prev => prev.slice(0, prev.length-1));
    }
  };

  const handleChange = (e) => {
    setLocalValue(e.target.value);
    setLocalError(null);
  };

  const handleDelete = (item) => {
    setLocalItems(localItems.filter((i) => i !== item));
  };

  const isValid = (val) => {
    let err = null;

    filters.forEach((filter) => {
      const message = filter(val, localItems);

      if (message) {
        err = message;
      }
    });

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
  };

  const isInList = (email) => {
    return localItems.includes(email);
  };

  const renderChips = localItems && localItems.map((itemId) => (
    <Chip
      className={clsx(classes.chip, classChipName)}
      key={itemId}
      label={itemId}
      onDelete={() => handleDelete(itemId)}
    />
  ));

  return (
    <Box>
      <TextField
        {...rest}
        variant="outlined"
        fullWidth
        type="text"
        value={localValue}
        error={!!localError}
        helperText={localError}
        inputProps={{
          autoComplete: "off",
          ...rest?.inputProps
        }}
        InputProps={{
          startAdornment: <>{renderChips}</>,
          className: classes.inputBase,
          classes: { input: classes.input },
          ...rest?.InputProps
        }}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      {max > 0 && (
        <Typography variant="caption" gutterBottom>
          {localItems.length}/{max}
        </Typography>
      )}
    </Box>
  );
}

export default ChipsInput;
