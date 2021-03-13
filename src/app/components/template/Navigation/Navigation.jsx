import React from "react";
import PropTypes from "prop-types";
import styles from "./Navigation.module.css";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutUser } from "../../../store/mutations";

const Navigation = ({ isAdmin, logoutUser, notVerifiedMeetingCount, verifiedMeetingCount, favoritesCount }) => (
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
      <NavLink to="/my-favorites" className="nav-link" activeClassName="active">
        <i className="nav-icon fas fa-heart"></i>
        <p>My Favorites {favoritesCount > 0 ? <span className="badge badge-danger">{favoritesCount}</span> : null}</p>
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink to="/my-meetings" className="nav-link" activeClassName="active">
        <i className="nav-icon fas fa-calendar-alt"></i>
        <p>My Meetings {notVerifiedMeetingCount > 0 ? <span className="badge badge-warning" data-toggle="tooltip" title="Not yet verified meetings">{notVerifiedMeetingCount}</span> : null}
        {verifiedMeetingCount > 0 ? <span className="badge badge-success" data-toggle="tooltip" title="Verified meetings">{verifiedMeetingCount}</span> : null}</p>
      </NavLink>
    </li>
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
  const {mymeetings, myfavorites} = state;
  var notVerifiedMeetingCount = 0;
  mymeetings.map((meeting) => {
    return !meeting.isVerified ? notVerifiedMeetingCount++ : null
    });
  var verifiedMeetingCount = 0;
  mymeetings.map((meeting) => {
    return meeting.isVerified ? verifiedMeetingCount++ : 0
    });
  var favoritesCount = myfavorites.length;
    
  return {
    isAdmin,
    notVerifiedMeetingCount,
    verifiedMeetingCount,
    favoritesCount
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
