import React from "react";
import { InputAdornment } from "@material-ui/core/";

import SearchIcon from "@material-ui/icons/Search";

import CustomInput from "../../components/CustomInput";
import useStyles from "./styles";

function Search({
  value,
  placeholder,

  onChange
}) {
  const classes = useStyles();

  return (
    <CustomInput
      disableUnderline
      wrapperClassName={classes.searchInputWrapper}
      className={classes.searchInput}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      endAdornment={
        <InputAdornment position="end">
          <SearchIcon className={classes.searchIcon} />
        </InputAdornment>
      } />
  )
}

Search.defaultProps = {
  className : "",
  placeholder: "Search ...",
  onChange: (e) => {}
}

export default Search;