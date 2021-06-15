import React from "react";

import { MenuItem, FormControl, Select } from "@material-ui/core";

function SortContent({ onChangeFilter, filter }) {
  return (
    <FormControl>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        value={filter}
        onChange={onChangeFilter}
        autoWidth
      >
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="users">Users</MenuItem>
        <MenuItem value="posts">Posts</MenuItem>
        <MenuItem value="unread">Unread</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SortContent;
