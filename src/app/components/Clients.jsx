import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const Clients = ({ clients }) => (
  <div className="container-fluid mt-5">
    <div className="row justify-content-center">
      <div className="col-4">
        <div className="card border-primary mb-3">
          <div className="card-header">Clients</div>
          <div className="card-body text-secondary">
            {clients.map((client) => (
              <div key={client.id}>
                <p>{client.name}</p>
                <Link
                  to={`/client/${client.id}`}
                  id={client.id}
                  className="btn btn-success btn-sm btn-block mb-2"
                >
                  view
                </Link>
              </div>
            ))}
            <Link
              to="/dashboard"
              className="btn btn-primary btn-sm btn-block mb-2"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = ({ clients }) => ({ clients });

export const ConnectedClients = connect(mapStateToProps)(Clients);
