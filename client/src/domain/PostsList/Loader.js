import React from 'react';

import Spinner from '../../components/Spinner';

export default function Loader() {
  return (
    <div className="d-flex justify-content-center p-3">
      <Spinner />
    </div>
  );
}