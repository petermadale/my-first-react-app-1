import React from "react";
import styles from "./MainFooter.module.css";
import { connect } from "react-redux";

export const MainFooter = () => (
  <>
    <footer className="main-footer">
      <strong>Copyright &copy; 2020 CRM App.</strong> All rights reserved.
    </footer>
  </>
);

const mapStateToProps = (state) => state;
export const ConnectedMainFooter = connect(mapStateToProps)(MainFooter);
