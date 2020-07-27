import React from "react";
import { connect } from "react-redux";

import { ConnectedClientSuggestionList } from "../Clients/ClientSuggestionsList/ClientSuggestionsList";

export const Dashboard = ({ isAdmin, clientContactDetailsSuggestions }) => (
  <>
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Dashboard</h1>
          </div>
        </div>
      </div>
    </section>

    <section className="content">
      <div className="card card-cyan">
        <div className="card-header">
          <h3 className="card-title">
            {!isAdmin ? <>Your</> : null} Client Address Suggestion(s)
          </h3>
        </div>

        {clientContactDetailsSuggestions.length > 0 ? (
          <ConnectedClientSuggestionList
            clientContactDetailsSuggestions={clientContactDetailsSuggestions}
          />
        ) : (
          <div className="card-body">
            <p>No suggestions found.</p>
          </div>
        )}
      </div>
    </section>
  </>
);

const mapStateToProps = (state) => {
  const clientContactDetailsSuggestions = state.clientContactDetailsSuggestions;
  let { isAdmin } = state.session;
  return {
    isAdmin,
    clientContactDetailsSuggestions,
  };
};

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
