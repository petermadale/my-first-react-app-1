import React from "react";
import { connect } from "react-redux";
import { ConnectedContentHeader } from "../template/contentholders/ContentHeader";

export const Dashboard = ({ id, name }) => (
  <>
    <ConnectedContentHeader pagename={"Dashboard"} />

    <div className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">Content here</div>
        </div>
      </div>
    </div>
  </>
);
const mapStateToProps = (state) => {
  let { id, name } = state.session;
  return {
    id: id,
    name: name,
  };
};

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
