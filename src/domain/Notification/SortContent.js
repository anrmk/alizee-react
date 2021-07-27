import React from "react";

import { MenuItem, FormControl, Select } from "@material-ui/core";

function SortContent({ onChange, filter }) {
  return (
    <FormControl>
      <Select value={filter} onChange={onChange} autoWidth>
        <MenuItem value="all">All</MenuItem>
        <MenuItem value="users">Users</MenuItem>
        <MenuItem value="posts">Posts</MenuItem>
        <MenuItem value="unread">Unread</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SortContent;
