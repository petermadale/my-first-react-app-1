import React from "react";
import { connect } from "react-redux";

export const Dashboard = ({ id, name }) => (
  <div className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1 className="m-0 text-dark">Dashboard</h1>
        </div>
      </div>
    </div>

    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">Content here</div>
        </div>
      </div>
    </div>
  </div>
);
const mapStateToProps = (state) => {
  let { id, name } = state.session;
  return {
    id: id,
    name: name,
  };
};

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
