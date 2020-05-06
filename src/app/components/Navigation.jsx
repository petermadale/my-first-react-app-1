import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";

const Navigation = ({ isADmin }) => (
  <>
    <Link to="/clients" className="btn btn-primary btn-sm btn-block mb-2">
      Clients
    </Link>
    <Link to="" className="btn btn-success btn-sm btn-block mb-2 disabled">
      My Meetings
    </Link>
    {isADmin ? (
      <Link
        to="/add-contact"
        className="btn btn-secondary btn-sm btn-block mb-2"
      >
        Add Contact
      </Link>
    ) : null}
    <Link to="/my-details" className="btn btn-info btn-sm btn-block mb-2">
      My Details
    </Link>
    <Link to="/" className="btn btn-danger btn-sm btn-block">
      Logout
    </Link>
  </>
);

const mapStateToProps = (state, ownProps) => {
  const isAdmin = state.session.isAdmin;
  return {
    isADmin: isAdmin,
  };
};

export const ConnectedNavigation = connect(mapStateToProps)(Navigation);
