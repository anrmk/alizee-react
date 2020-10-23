import React from 'react';
import LockIcon from '@material-ui/icons/Lock';

import './Post.scss';

export default function PayableContent({ amount }) {
  return (
    <div className="payable-content d-flex justify-content-center align-items-center flex-column">
      <LockIcon />
      <p className="h1">{amount}$</p>
    </div>
  );
}
