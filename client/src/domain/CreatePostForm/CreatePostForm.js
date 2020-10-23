import React, { useState, useRef } from "react";

import Thumbnail from "../../components/Thumbnail";

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import CommentOutlinedIcon from '@material-ui/icons/CommentOutlined';
import CommentBlockOutlinedIcon from '@material-ui/icons/ModeCommentOutlined';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

import './CreatePostForm.scss';

const initialFormData = {
  description: "",
  commentable: false,
  private: false,
  amount: 0
}

export default function CreatePostForm({ onSubmit, user }) {
  //const uploaderRef = useRef();
  const privateRef = useRef();
  const commentableRef = useRef();
  const mediasRef = useRef();
  const messageRef = useRef();

  const [media, setMedia] = useState([]);
  const [formData, setFormData] = useState(initialFormData)

  const resetFormData = () => {
    setFormData(initialFormData);
    setMedia([]);
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(formData.description.trim().length === 0 && media.length === 0)
      return;

    onSubmit && onSubmit(formData, media);
    resetFormData();
  }

  const handleFormTextChange = (e) => {
    setFormData({ ...formData, [e.current.name]: e.current.value})
  }

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.current.name]: !formData[e.current.name]})
  }

  const handleFormMediaChange = (e) => {
    var mediaFiles =[...e.current.files]
    mediaFiles.forEach(file => file.previewURL = URL.createObjectURL(file))
    setMedia(mediaFiles)
  }

  return (
    <div className="card shadow mb-3">
      <div className="card-body">
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <input type="hidden" name="private" value={formData.private} ref={privateRef} />
          <input type="hidden" name="commentable" value={formData.commentable} ref={commentableRef}/>

          <div className="">
            <div className="input-group">
              <div className="input-group-prepend">
                <button className="btn btn-outline-secondary" type="button" onClick={(e) => handleFormDataChange(privateRef)} >
                  {formData.private ? <LockOutlinedIcon fontSize="small" /> : <LockOpenOutlinedIcon fontSize="small" />}
                </button>
                <button className="btn btn-outline-secondary" type="button" onClick={(e) => handleFormDataChange(commentableRef)} >
                  {formData.commentable ? <CommentOutlinedIcon fontSize="small" /> : <CommentBlockOutlinedIcon fontSize="small" />}
                </button>
              </div>
              <input className="form-control" type="text" 
                ref={messageRef} 
                name="description"
                autoFocus
                maxLength="2048" 
                placeholder={`What's on your mind, ${user.fullName}?`} 
                value={formData.description} 
                onChange={(e) => handleFormTextChange(messageRef)} />
              <div className="input-group-append">
                <label className="btn btn-outline-secondary m-0">
                  <PhotoLibraryIcon fontSize="small" />
                  <input type="file" 
                    ref={mediasRef} 
                    name="medias" 
                    style={{display: "none"}} 
                    multiple 
                    onChange={(e) => handleFormMediaChange(mediasRef)} />
                </label>
              </div>
            </div>
            <small className="form-text text-muted">Characters entered  {formData.description.length} out of 2048</small>
            
            {/* <div className="input-group mb-3">
              <div className="input-group-prepend">
                <div className="input-group-text">$</div>
              </div>
              <input 
                ref={lockRef}
                className="form-control"
                name="amount"
                type="number"
                min="0"
                aria-label="Amount (to the nearest dollar)"
                placeholder="Amount"
                value={formData.amount}
                onChange={() => {}} />
            </div> */}
          </div>
          <button type="submit" className="sr-only">Create</button>
        </form>
        
        {media.map((item) => (
            <Thumbnail key={item.name} name={item.name} url={item.previewURL} />
          ))
        }
       
      </div>
    </div>
  );
}
