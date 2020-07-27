import React from "react";
import { connect } from "react-redux";
import { ConnectedContentHeader } from "../template/contentholders/ContentHeader";
import { Link } from "react-router-dom";

export const NoAccess = () => (
  <>
    <ConnectedContentHeader pagename="Page Error" />
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            <div className="card card-danger">
              <div className="card-header">
                <h3 className="card-title">Unauthorized access</h3>
              </div>
              <div className="card-body">
                <p>
                  Go back to <Link to="/dashboard">dashboard</Link>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

const mapStateToProps = (state, ownProps) => {
  return state;
};
export const ConnectedNoAccess = connect(mapStateToProps)(NoAccess);
