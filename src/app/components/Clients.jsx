import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { history } from "../store/history";
import { deleteClient } from "../store/mutations";
import { Toast, Swal_alert } from "../store/sweetalert";
import { ConnectedButtonFavorite } from "./ButtonFavorite";

export const Clients = ({ clients, isAdmin, deleteClient }) => (
  <>
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Clients</h1>
            {isAdmin ? (
              //   <Link to="/add-contact" className="btn btn-success">
              //     <i className="fas fa-file-alt"></i>
              //     Create New Client
              //   </Link>
              <a
                className="btn btn-success"
                data-widget="control-sidebar"
                data-slide="true"
                href="#"
                role="button"
              >
                <i className="fas fa-file-alt"></i>
                Create New Client
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>

    <section className="content">
      <div className="card card-solid">
        <div className="card-body pb-0">
          <div className="row d-flex align-items-stretch">
            {clients.length > 0 ? (
              <>
                {clients.map((client) => (
                  <div
                    className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch"
                    key={client.id}
                  >
                    <div className="card card-outline card-info card-client">
                      <div className="card-header text-muted border-bottom-0">
                        {client.name}
                        <span className="float-right">
                          <ConnectedButtonFavorite client={client} />
                        </span>
                      </div>
                      <div className="card-body pt-0">
                        <div className="row">
                          <div className="col-12">
                            <ul className="ml-4 mb-0 fa-ul text-muted">
                              <li className="small">
                                <span className="fa-li">
                                  <i className="fas fa-lg fa-envelope"></i>
                                </span>
                                <a href={`mailto:${client.email}`}>
                                  {client.email}
                                </a>
                              </li>
                              <li className="small">
                                <span className="fa-li">
                                  <i className="fas fa-lg fa-map-marker"></i>
                                </span>{" "}
                                {client.address}
                              </li>
                              <li className="small">
                                <span className="fa-li">
                                  <i className="fas fa-lg fa-phone"></i>
                                </span>
                                <a href={`tel:+${client.phone}`}>
                                  {client.phone}
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer">
                        <div className="text-right">
                          {isAdmin ? (
                            <>
                              <Link
                                to={`/client/${client.id}/true`}
                                id={client.id}
                                className="btn btn-info btn-sm mr-1"
                              >
                                <i className="fas fa-pencil-alt"></i>
                                Edit
                              </Link>
                              <button
                                className="btn btn-danger btn-sm mr-1"
                                onClick={() => deleteClient(client.id)}
                              >
                                <i className="fas fa-trash"></i>
                                Delete
                              </button>
                            </>
                          ) : null}
                          <Link
                            to={`/client/${client.id}`}
                            id={client.id}
                            className="btn btn-primary btn-sm"
                          >
                            <i className="fas fa-user"></i>
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="alert alert-warning">
                <h5>
                  <i className="icon fas fa-exclamation-triangle"></i>
                  No clients found.
                </h5>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  </>
);

const mapStateToProps = (state, ownProps) => {
  const isAdmin = state.session.isAdmin;
  const clients = state.clients;

  return {
    clients,
    isAdmin,
  };
};

const mapDispatchStateToProps = (dispatch, ownProps) => {
  return {
    deleteClient(id) {
      console.log(id);
      Swal_alert.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.value) {
          dispatch(deleteClient(id));
          Toast.fire({
            icon: "success",
            title: "Client deleted.",
          });
        }
      });
    },
  };
};

export const ConnectedClients = connect(
  mapStateToProps,
  mapDispatchStateToProps
)(Clients);
