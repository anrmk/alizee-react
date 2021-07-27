import React from "react";

import { FILTER_BY_DAYS, FILTER_BY_MONTHS, FILTER_BY_WEEKS, FILTER_BY_YEARS } from "../../constants/chart_sort_date";

import { Select, FormControl, MenuItem } from "@material-ui/core";

function SortChartDate({ onFilter, filter }) {
  return (
    <FormControl>
      <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        value={filter}
        onChange={onFilter}
        autoWidth
      >
        <MenuItem value={FILTER_BY_MONTHS}>Monthly</MenuItem>
        <MenuItem value={FILTER_BY_DAYS}>Daily</MenuItem>
        <MenuItem value={FILTER_BY_YEARS}>Yearly</MenuItem>
        <MenuItem value={FILTER_BY_WEEKS}>Weekly</MenuItem>
      </Select>
    </FormControl>
  );
}

export default SortChartDate;
