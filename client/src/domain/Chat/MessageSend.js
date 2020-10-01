import React, { useState } from 'react'

import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';

function MessageSend(props) {
  const {roomId} = useState(props.roomId)
  const [input, setInput] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    props.onCreateMessage && props.onCreateMessage(input);
    setInput("")
  }

  return (
    <div className="d-block p-3">
       <form className="border rounded-pill">
          <div className="input-group input-group-lg">
            <div className="input-group-prepend">
              <button className="btn btn-link" type="button">
                <SentimentSatisfiedOutlinedIcon />
              </button>
            </div>

            <input type="text" className="form-control border-0" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" />
            <button type="submit" className="sr-only" onClick={handleSendMessage}>
              Submit
            </button>

            <div className="input-group-append">
              <button className="btn btn-link" type="button">
                <ImageOutlinedIcon />
              </button>
            </div>
          </div>
        </form>
    </div>
  )
}

export default MessageSend;
