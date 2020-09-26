import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom';

import "./Modal.scss"

function Modal(props) {
  const el = `<div>${props.children}</div>`

  useEffect(() => {
    // return function() {
    //   modalRoot.removeChild(el);
    // }
  }, [])

  return (
    props.show ? ReactDOM.createPortal(
    <div>
      <div className="modal fade show" tabIndex="-1" role="dialog" aria-hidden="" data-keyboard="false" data-backdrop="static">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{props.title}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              {props.children}
            </div>

            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
     
     </div>
  , document.getElementById('modal-root')) : null
  );
}

export default Modal;
