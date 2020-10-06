import React from 'react';

import './Avatar.scss';

function Avatar({ url, size }) {
  return (
    <div>
      <img className={`avatar__${size} rounded-circle`} src={url} />
    </div>
  );
}

Avatar.defaultProps = {
  url: '',
  size: 'small'
};

export default Avatar;
