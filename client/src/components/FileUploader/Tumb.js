import React from "react";
import ReactPlayer from 'react-player';
import DeleteForever from '@material-ui/icons/DeleteForever';

import './FileUploader.scss';
import { MEDIA_IMAGE, MEDIA_VIDEO } from '../../constants/media_types';

export default function Thumb({ 
  name,
  previewUrl,
  mediaType,
  onDeleteClick }) {

  const handleDeleteBtnClick = (e) => {
    onDeleteClick && onDeleteClick(name);
  }
  
  const renderContent = (type, url) => {
    if (type === MEDIA_IMAGE) {
      return (
        <img
          src={url}
          className="thumb__media"
        />
      )
    } else if (type === MEDIA_VIDEO) {
      return (
        <ReactPlayer 
          width="100%"
          className="thumb__video"
          url={url} />
      )
    }
  } 

  return (
    <div className="thumb">
      <div className="thumb__close-btn">
        <DeleteForever onClick={handleDeleteBtnClick} />
      </div>
      <div className="thumb__inner">
        {renderContent(mediaType, previewUrl)}
      </div>
    </div>
  );
}
