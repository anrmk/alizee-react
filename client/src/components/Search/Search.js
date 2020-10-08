import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

function Search(props) {
  return (
    <div className={`input-group ${props.className}`}>
      <div className="input-group-prepend">
        <span className="input-group-text border-0 bg-white"><SearchIcon /></span>
      </div>
      <input type="text" className="form-control border-0" placeholder={props.placeholder} onChange={props.onChange}/>
    </div>
  )
}

Search.defaultProps = {
  className : "",
  placeholder: "Search ...",
  onChange: (e) => {}
}


export default Search;