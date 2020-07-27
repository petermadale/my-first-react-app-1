import React from "react";
import styles from "./MainHeader.module.css";
import { connect } from "react-redux";
import { ConnectedSearchInput } from "../contentholders/SearchClients/SearchClients";

export const MainHeader = () => (
  <nav className="main-header navbar navbar-expand navbar-dark">
    <ul className={`navbar-nav ${styles.menuBtn}`}>
      <li className="nav-item">
        <a className="nav-link" data-widget="pushmenu" href="#" role="button">
          <i className="fas fa-bars"></i>
        </a>
      </li>
    </ul>
    <ConnectedSearchInput />
  </nav>
);

const mapStateToProps = (state) => state;
export const ConnectedMainHeader = connect(mapStateToProps)(MainHeader);
