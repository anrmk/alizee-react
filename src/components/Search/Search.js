import React from "react";
import { InputAdornment, TextField } from "@material-ui/core/";

import SearchIcon from "@material-ui/icons/Search";

import useStyles from "./styles";

function Search({
  value,
  placeholder,

  onChange,
}) {
  const classes = useStyles();

  return (
    <TextField
      variant="outlined"
      fullWidth
      placeholder={placeholder}
      type="text"
      value={value}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon className={classes.searchIcon} />
          </InputAdornment>
        ),
      }}
      onChange={onChange}
    />
  );
}

Search.defaultProps = {
  className: "",
  placeholder: "Search ...",
  onChange: () => {},
};

export default Search;
