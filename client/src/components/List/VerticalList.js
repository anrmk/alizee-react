import React from "react";
import PropTypes from 'prop-types';

export default function VerticalList({ as, className, children }) {
  return React.createElement(as, { className: "list-group " + className }, children);
}

VerticalList.propTypes = {
  as: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.array,
}

VerticalList.defaultProps = {
  as: "ul",
  className: "",
  children: [],
}