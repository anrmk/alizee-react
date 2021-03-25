import React, { useCallback, useEffect, useState } from "react";
import { Box, InputBase } from "@material-ui/core";

import SearchIcon from "@material-ui/icons/SearchOutlined";

import { debounce } from "../../helpers/functions"

import useStyles from "./styles";

function SearchInput({
  defaultValue = "",
  interval = 500,

  onSendQuery,
}) {
  const classes = useStyles();
  const [value, setValue] = useState(defaultValue);
  const [onceDefaultChanged, setOnceDefaultChanged] = useState(false)
  const myDebounce = useCallback(debounce((query) => onSendQuery(query), interval), []);

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

  return (
    <Box mb={2} ml={"auto"} mr={"auto"} className={classes.search}>
      <Box className={classes.searchIcon}>
        <SearchIcon />
      </Box>
      <Box>
        <InputBase
          fullWidth
          type="text"
          value={value}
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
}

export default SearchInput;
