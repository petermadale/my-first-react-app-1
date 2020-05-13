import React from "react";
import { connect } from "react-redux";
import { ConnectedSearchInput } from "./SearchInput";

export const MainHeader = () => (
  <nav className="main-header navbar navbar-expand navbar-white navbar-light">
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#" role="button">
          <i className="fas fa-bars"></i>
        </a>
      </li>
    </ul>
    <div className="search-client">
      <ConnectedSearchInput />
    </div>
  </nav>
);

const mapStateToProps = (state) => state;
export const ConnectedMainHeader = connect(mapStateToProps)(MainHeader);
