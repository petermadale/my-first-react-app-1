import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setClientName } from "../store/mutations";
import { history } from "../store/history";
import { ConnectedClientsEdit } from "./ClientsEdit";

const ClientsDetail = ({ isAdmin, isEdit, client, setClientName }) => (
  <div className="container-fluid mt-5">
    <div className="row justify-content-center">
      <div className="col-4">
        <div className="card border-primary mb-3">
          <div className="card-header">
            {isAdmin && isEdit ? (
              <ConnectedClientsEdit client={client} />
            ) : (
              <p>{client.name}</p>
            )}
          </div>
          <div className="card-body text-secondary">
            <Link
              to="/clients"
              className="btn btn-primary btn-sm btn-block mb-2"
            >
              Back to Clients
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  let id = ownProps.match.params.id;
  let isEdit = ownProps.match.params.isEdit === "true" ? true : false;
  let isAdmin = state.session.isAdmin;
  let client = state.clients.find((client) => client.id === id);
  return {
    client,
    isAdmin,
    isEdit,
  };
};

const mapDispatchStateToProps = (dispatch, ownProps) => {
  let id = ownProps.match.params.id;
  return {
    setClientName(e) {
      e.preventDefault();
      dispatch(setClientName(id, e.target[`clientname`].value));
    },
    deleteClient(e) {
      e.preventDefault();
      dispatch(deleteClient(id));
      history.push("/clients");
    },
  };
};

export const ConnectedClientsDetail = connect(
  mapStateToProps,
  mapDispatchStateToProps
)(ClientsDetail);
