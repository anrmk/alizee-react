import React from "react";
import PropTypes from "prop-types";

import { Box } from "@material-ui/core/";

import HotStreamersItem from "./HotStreamersItem";

function HotStreamersItemList({
  items,

  onJoinStream,
}) {

  return (
    <Box>
      {items && items.map((item) => (
        <HotStreamersItem
          key={item.userName}
          item={item}
          onJoinStream={onJoinStream} />
      ))}
    </Box>
  );
};

HotStreamersItemList.propTypes = {
  items: PropTypes.array,

  onSendTip: PropTypes.func,
  onJoinStream: PropTypes.func,
};

HotStreamersItemList.defaultProps = {
  items: [],

  onSendTip: undefined,
  onJoinStream: undefined,
};

export default HotStreamersItemList;
