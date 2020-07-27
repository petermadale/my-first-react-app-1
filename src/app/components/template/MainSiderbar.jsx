import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ConnectedNavigation } from "./Navigation";
import logo from "../../images/crm_app_logo.png";
import avatar from "../../admin-lte/dist/img/avatar04.png";

export const MainSidebar = ({ id, firstName, lastName }) => (
  <aside className="main-sidebar elevation-4 sidebar-dark-client-primary">
    <Link to="/dashboard" className="brand-link navbar-gray-dark">
      <img
        src={logo}
        alt="CRM App"
        className="brand-image img-circle elevation-3"
      />
      <span className="brand-text font-weight-light">CRM App</span>
    </Link>

    <div className="sidebar pr-0 pl-0">
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img
            src={avatar}
            className="img-circle elevation-2"
            alt="User Image"
          />
        </div>
        <div className="info">
          <Link to="/my-details" className="d-block">
            Welcome {firstName} {lastName}
          </Link>
        </div>
      </div>

      <nav className="mt-2">
        <ul
          className="nav nav-sidebar flex-column"
          data-widget="treeview"
          role="menu"
          data-accordion="false"
        >
          <ConnectedNavigation />
        </ul>
      </nav>
    </div>
  </aside>
);

const mapStateToProps = (state) => {
  let { firstName, lastName } = state.session;
  return {
    firstName,
    lastName,
  };
};
export const ConnectedMainSidebar = connect(mapStateToProps)(MainSidebar);
