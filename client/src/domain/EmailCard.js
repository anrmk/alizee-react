import React from "react";
import { Link } from "react-router-dom";

import MailIcon from "@material-ui/icons/Mail";

function EmailCard({ onResendBtnClick }) {

  return (
    <div className="card mt-3">
      <div className="row no-gutters">
        <div className="d-flex align-items-center justify-content-center col-md-4">
          <div className="pmd-card-icon">
            <MailIcon color="disabled" style={{ fontSize: '8rem' }} />
          </div>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">Email confirmation</h5>
            <p className="card-text">Please check for an email and go to the link to verify your account</p>
            <p className="card-text">
              <small className="text-muted">
                <button type="button" class="btn btn-link" onClick={onResendBtnClick}>Resend confirmation link</button>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div> 
  )
}

export default EmailCard
