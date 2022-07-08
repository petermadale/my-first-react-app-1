import React from "react";

const AlertComponent = ({ type, text }) => (
  <div className={`alert alert-${type} mb-0`}>
    <h5>
      <i className="icon fas fa-exclamation-triangle"></i>
      No {text} found.
    </h5>
  </div>
);

export default AlertComponent;
