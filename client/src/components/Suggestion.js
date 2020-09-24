import React, {useState, useEffect} from 'react';
import Badge from '@material-ui/core/Badge';  
import { Avatar, IconButton } from "@material-ui/core";
import { makeStyles, withStyles } from '@material-ui/core/styles';

import db from "../firebase";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

function Suggestion() {
  const [suggestions, setSuggestions] = useState([]);

   useEffect(() => {
     db.collection("account")
     .limit(10)
     .onSnapshot((datas) => {
       setSuggestions(datas.docs.map((d) => ({ id: d.id, data: d.data() })));
     });
   }, []);

  return (
    <div className="sticky-top mt-3">
      <h6 className="text-muted">Suggestions For You</h6>
      <ul className="list-group list-group-flush">
        {suggestions.map((suggestion) => (
          <li className="list-group-item d-flex justify-content-between align-items-center p-1" key={suggestion.id}>
            <div >
              <StyledBadge overlap="circle" anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant="dot" >
                <Avatar src={suggestion.data.avatarURL} />
              </StyledBadge>
              <small className="ml-2">
                {suggestion.data.name}
              </small>
              </div>
            <a className="btn-link"><small>Follow</small></a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Suggestion;
