import React from "react";
import PropTypes from "prop-types";
import styles from "./Navigation.module.css";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../../store/mutations";

const Navigation = ({ isAdmin, logoutUser }) => (
  <>
    <li className="nav-item">
      <NavLink to="/dashboard" className="nav-link" activeClassName="active">
        <i className="nav-icon fas fa-tachometer-alt"></i>
        <p>Dashboard</p>
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink to="/clients" className="nav-link" activeClassName="active">
        <i className="nav-icon fas fa-user-nurse"></i>
        <p>Clients</p>
      </NavLink>
    </li>
    {isAdmin ? (
      <li className="nav-item">
        <NavLink to="/users" className="nav-link" activeClassName="active">
          <i className="nav-icon fas fa-users"></i>
          <p>Users</p>
        </NavLink>
      </li>
    ) : null}
    <li className="nav-item">
      <NavLink to="/my-details" className="nav-link" activeClassName="active">
        <i className="nav-icon fas fa-edit"></i>
        <p>My Details</p>
      </NavLink>
    </li>
    <li className="nav-item">
      <a href="javascript:void(0)" onClick={logoutUser} className="nav-link">
        <i className="nav-icon fas fa-sign-out-alt"></i>
        <p>Logout</p>
      </a>
    </li>
  </>
);

const mapStateToProps = (state, ownProps) => {
  const isAdmin = state.session.isAdmin;
  return {
    isAdmin,
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
