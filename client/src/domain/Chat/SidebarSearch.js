import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

function SidebarSearch() {
  return (
    <div className="p-3 bg-info">
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text bg-white"><SearchIcon /></span>
        </div>
        <input type="text" className="form-control border-left-0" placeholder="Search or start new chat "/>
      </div>
    </div>
  )
}

export default SidebarSearch;