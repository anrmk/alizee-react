import React, { useCallback, useEffect, useState } from "react";
import { OutlinedInput, InputAdornment, IconButton } from "@material-ui/core";

import SearchIcon from "@material-ui/icons/SearchOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

import { debounce } from "../../helpers/functions";

import useStyles from "./styles";

function SearchInput({
  defaultValue = "",
  interval = 500,

  onSendQuery,
  onClearInput,
}) {
  const classes = useStyles();
  const [value, setValue] = useState(defaultValue);
  const [onceDefaultChanged, setOnceDefaultChanged] = useState(false);
  const myDebounce = useCallback(
    debounce((query) => onSendQuery && onSendQuery(query), interval),
    []
  );

  useEffect(() => {
    if (!onceDefaultChanged && defaultValue) {
      setValue(defaultValue);
      setOnceDefaultChanged(true);
    }
  }, [defaultValue]);

  const handleChange = (e) => {
    setValue(e.target.value);
    myDebounce(e.target.value.trim());
  };

  const handleClearInput = () => {
    onClearInput();
    setValue(defaultValue);
  };
  return (
    <OutlinedInput
      fullWidth
      margin="dense"
      size="small"
      placeholder="Search…"
      variant="filled"
      value={value}
      startAdornment={
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      }
      endAdornment={
        onClearInput && (
          <InputAdornment position="end">
            <IconButton onClick={handleClearInput} disabled={!value}>
              <CloseOutlinedIcon />
            </IconButton>
          </InputAdornment>
        )
      }
      onChange={handleChange}
    />
  );
}

export default SearchInput;
