import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { ConnectedNavigation } from "./Navigation";

export const MainSidebar = ({ id, name }) => (
  <aside className="main-sidebar sidebar-dark-primary elevation-4">
    <Link to="/dashboard" className="brand-link">
      <img
        src="src/app/images/crm_app_logo.png"
        alt="CRM App"
        className="brand-image img-circle elevation-3"
      />
      <span className="brand-text font-weight-light">CRM App</span>
    </Link>

    <div className="sidebar">
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        <div className="image">
          <img
            src="/src/app/admin-lte/dist/img/avatar04.png"
            className="img-circle elevation-2"
            alt="User Image"
          />
        </div>
        <div className="info">
          <Link to="/my-details" className="d-block">
            Welcome {name}
          </Link>
        </div>
      </div>

      <nav className="mt-2">
        <ul
          className="nav nav-pills nav-sidebar flex-column"
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
  let { id, name } = state.session;
  return {
    id: id,
    name: name,
  };
};
export const ConnectedMainSidebar = connect(mapStateToProps)(MainSidebar);
