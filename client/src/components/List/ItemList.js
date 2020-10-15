import React from "react";
import PropTypes from 'prop-types';

export default function ItemList({ as, className, children }) {
  return React.createElement(as, { className: "list-group-item " + className }, children)
}

ItemList.protoTypes = {
  as: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.array,
}

ItemList.defaultProps = {
  as: "li",
  className: "",
  children: [],
}
