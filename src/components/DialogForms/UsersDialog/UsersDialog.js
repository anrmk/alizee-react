import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@material-ui/core";

import SelectableList from "../../SelectableList/SelectableList";
import SearchInput from "../../SearchInput";

function UsersDialog({
  items,
  preSelected = [],
  multiple = false,
  selectionLimit = 3,
  loading,

  onItemSelect,
  onSendQuery,
  onResetQuery,
}) {
  const [selectedLength, setSelectedLength] = useState(preSelected.length);

  useEffect(
    () => () => {
      onResetQuery && onResetQuery();
    },
    []
  );

  const handleItemSelect = (pItems) => {
    setSelectedLength(pItems.length);

    onItemSelect && onItemSelect(pItems);
  };

  return (
    <>
      <SearchInput onSendQuery={onSendQuery} />
      <Typography align="right">
        {selectedLength}/{selectionLimit}
      </Typography>

      {loading ? (
        <Box display="flex" alignItems="center" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <SelectableList
          items={items}
          preSelected={preSelected}
          multiple={multiple}
          maxSelections={selectionLimit}
          onItemSelect={handleItemSelect}
        />
      )}
    </>
  );
}

export default UsersDialog;
