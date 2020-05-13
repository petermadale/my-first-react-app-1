import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setClientName } from "../store/mutations";
import { history } from "../store/history";
import { ConnectedClientsEdit } from "./ClientsEdit";

const ClientsDetail = ({ isAdmin, isEdit, client, setClientName }) => (
  <>
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Client Detail</h1>
          </div>
        </div>
      </div>
    </section>

    <section className="content">
      {isAdmin && isEdit ? (
        <ConnectedClientsEdit client={client} />
      ) : (
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-12 order-1 order-md-2">
                <h3 className="text-primary">
                  <i className="fas fa-user"></i> {client.name}
                </h3>
                <br />
                <div className="text-muted">
                  <p className="text-sm">
                    <i className="fas fa-envelope"></i> Email:
                    <b className="d-block">{client.email}</b>
                  </p>
                  {client.address ? (
                    <p className="text-sm">
                      <i className="fas fa-building"></i> Address:
                      <b className="d-block">{client.address}</b>
                    </p>
                  ) : null}
                  {client.phone ? (
                    <p className="text-sm">
                      <i className="fas fa-phone"></i> Phone #:
                      <b className="d-block">{client.phone}</b>
                    </p>
                  ) : null}
                  {client.ext ? (
                    <p className="text-sm">
                      <i className="fas fa-phone"></i> Ext:
                      <b className="d-block">{client.ext}</b>
                    </p>
                  ) : null}
                  {client.cell ? (
                    <p className="text-sm">
                      <i className="fas fa-mobile"></i> Cell Phone:
                      <b className="d-block">{client.cell}</b>
                    </p>
                  ) : null}
                  {client.fax ? (
                    <p className="text-sm">
                      <i className="fas fa-fax"></i> Fax:
                      <b className="d-block">{client.fax}</b>
                    </p>
                  ) : null}
                </div>
                <div className="text-center mt-5 mb-3">
                  <Link to="/clients" className="btn btn-success btn-sm">
                    Back to Clients
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  </>
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
