import { connect } from "react-redux";
import { Link } from "react-router-dom";
import React from "react";
import { logoutUser } from "../store/mutations";

const Navigation = ({ isADmin, logoutUser }) => (
  <>
    <li className="nav-item">
      <Link to="/dashboard" className="nav-link">
        <i className="nav-icon fas fa-tachometer-alt"></i>
        <p>Dashboard</p>
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/clients" className="nav-link">
        <i className="nav-icon fas fa-th"></i>
        <p>Clients</p>
      </Link>
    </li>
    {/* <li className="nav-item">
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
    ) : null} */}
    <li className="nav-item">
      <Link to="/my-favorites" className="nav-link">
        <i className="nav-icon fas fa-heart"></i>
        <p>My Favorites</p>
      </Link>
    </li>
    <li className="nav-item">
      <Link to="/my-details" className="nav-link">
        <i className="nav-icon fas fa-edit"></i>
        <p>My Details</p>
      </Link>
    </li>
    <li className="nav-item">
      <a href="javascript:void(0)" onClick={logoutUser} className="nav-link">
        <i className="nav-icon fas fa-sign-out-alt"></i>
        <p>Logout</p>
      </a>
      {/* <Link to="/" className="nav-link">
        <i className="nav-icon fas fa-sign-out-alt"></i>
        <p>Logout</p>
      </Link> */}
    </li>
  </>
);

const mapStateToProps = (state, ownProps) => {
  const isAdmin = state.session.isAdmin;
  return {
    isADmin: isAdmin,
  };
};

const mapDispatchStateToProps = (dispatch, ownProps) => {
  return {
    logoutUser() {
      console.log(ownProps);
      dispatch(logoutUser());
    },
  };
};

export const ConnectedNavigation = connect(
  mapStateToProps,
  mapDispatchStateToProps
)(Navigation);
