import React, {useState, useEffect} from 'react'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';

import "./../components/Posts.scss"

function Posts() {
  const [posts] = useState([]);
  useEffect(() => {

  }, []);

  return (
    <div>
      {posts.map((post) => (
      <div className="card mb-5" key={post.id}>
        <div className="card-header">
          header
        </div>
        <div className="card-image-cover">
          <img className="card-img" src={post.data.mediaURL}  alt="" />
        </div>
        <div className="card-body" >
          <p>{post.data.comment}</p>
          <FavoriteBorderIcon className="mr-3" fontSize="large" />
          <ChatBubbleOutlineOutlinedIcon className="mr-3" fontSize="large"/>
          <ShareOutlinedIcon className="mr-3" fontSize="large"/>
          <MonetizationOnOutlinedIcon className="mr-3" fontSize="large"/>
        </div>
      </div>
      ))}
    </div>
  )
}

export default Posts;
