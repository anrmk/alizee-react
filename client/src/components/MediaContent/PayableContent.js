import React from 'react';
import PropTypes from 'prop-types';

import LockIcon from '@material-ui/icons/Lock';

import './MediaContent.scss';

export default function PayableContent({ amount }) {
  return (
    <div className="payable-content d-flex justify-content-center align-items-center flex-column">
      <LockIcon />
      <p className="h1">{amount}$</p>
    </div>
  );
}

PayableContent.propTypes = {
  amount: PropTypes.number
}

PayableContent.defaultProps = {
  amount: 0
}
