import React from 'react'

import Posts from "../components/Posts"
import Suggestion from "../components/Suggestion"

function Feed() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8 col-md-12">
          <Posts />
        </div>
        <div className="col-lg-4 d-none d-lg-block d-xl-block">
          <Suggestion />
        </div>
      </div>
    </div>
  )
}

export default Feed;
