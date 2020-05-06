import React from "react";
import { connect } from "react-redux";
import { ConnectedUnitList } from "./Units";
import { ConnectedNavigation } from "./Navigation";

export const Dashboard = ({ id, name }) => (
  <div className="container-fluid mt-5">
    <div className="row justify-content-center">
      <div className="col-4">
        <div className="card border-primary mb-3">
          <div className="card-header">Welcome {name}</div>
          <div className="card-body text-secondary">
            <form>
              <input
                type="text"
                name=""
                id=""
                className="form-control"
                placeholder="Search"
              />
            </form>
            <ConnectedNavigation id={id} />
          </div>
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
