import React from "react";
import { connect } from "react-redux";
import { ConnectedClientsNew } from "../pages/clients/ClientsNew";

export const MainFooter = () => (
  <>
    {/* <aside className="control-sidebar control-sidebar-dark">
      <div className="p-3">
        <ConnectedClientsNew />
      </div>
    </aside> */}
    <footer className="main-footer">
      {/* <div className="float-right d-none d-sm-inline">Anything you want</div> */}
      <strong>Copyright &copy; 2020 CRM App.</strong> All rights reserved.
    </footer>
  </>
);

const mapStateToProps = (state) => state;
export const ConnectedMainFooter = connect(mapStateToProps)(MainFooter);
