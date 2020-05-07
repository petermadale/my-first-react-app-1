import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";

const Navigation = ({ isADmin }) => (
  <>
    <li className="nav-item">
      <Link to="/clients" className="nav-link">
        <i className="nav-icon fas fa-th"></i>
        <p>Clients</p>
      </Link>
    </li>
    <li className="nav-item">
      <Link to="" className="nav-link">
        <i className="nav-icon fas fa-calendar-alt"></i>
        <p>My Meetings</p>
      </Link>
    </li>
    {isADmin ? (
      <li className="nav-item">
        <Link to="/add-contact" className="nav-link">
          <i className="nav-icon fas fa-file-alt"></i>
          <p>Create New Client</p>
        </Link>
      </li>
    ) : null}
    <li className="nav-item">
      <Link to="/my-details" className="nav-link">
        <i className="nav-icon fas fa-edit"></i>
        <p>My Details</p>
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/" className="nav-link">
        <i className="nav-icon fas fa-sign-out-alt"></i>
        <p>Logout</p>
      </Link>
    </li>
  </>
);

const mapStateToProps = (state, ownProps) => {
  const isAdmin = state.session.isAdmin;
  return {
    isADmin: isAdmin,
  };
};

export const ConnectedNavigation = connect(mapStateToProps)(Navigation);
