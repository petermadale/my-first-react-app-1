import React from "react";
import { connect } from "react-redux";
import { ConnectedUnitList } from "./Units";

export const Dashboard = ({ home_owners }) => (
  <div className="row">
    <h2>Dashboard</h2>
    {home_owners.map((owner) => (
      <ConnectedUnitList key={owner.id} id={owner.id} name={owner.name} />
    ))}
  </div>
);
function mapStateToProps(state) {
  return {
    home_owners: state.home_owners,
  };
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
