import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import "./CustomLink.scss";

const CustomLink = (props) => {
  const { 
    history,
    to,
    as: Tag,
    className,
    staticContext,
    ...rest
  } = props;
  const { onClick } = props;

  return (
    <Tag
      {...rest}
      className={`custom-link ${className}`}
      onClick={event => {
        onClick && onClick(event);
        history.push(to);
      }}
    />
  );
}

CustomLink.propTypes = {
  to: PropTypes.string.isRequired,
  as: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,

  onClick: PropTypes.func
};

CustomLink.defaultProps = {
  to: "/",
  as: "a",
  className: "",
  children: null,
  history: {},
  
  onClick: undefined
};

export default withRouter(CustomLink);