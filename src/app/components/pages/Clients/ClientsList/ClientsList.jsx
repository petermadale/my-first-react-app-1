import React from "react";
import PropTypes from "prop-types";
import styles from "./ClientsList.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteClient } from "../../../../store/mutations";
import { Toast, Swal_alert } from "../../../../scripts/sweetalert";
import $ from "jquery";
import { compare } from "../../../../scripts/compare";

export const ClientsList = ({ clients, isAdmin, deleteClient }) => (
  <>
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Clients</h1>
          </div>
          <div className="col-sm-6">
            {isAdmin ? (
              <Link
                to="/client-new"
                className="btn bg-gradient-success float-right"
              >
                <i className="fas fa-file-alt"></i>
                Create New Client
              </Link>
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
                    <div
                      className={`card card-client-primary card-outline ${styles.cardClient}`}
                    >
                      <div className="card-body box-profile">
                        {/* <ConnectedButtonFavorite client={client} /> */}
                        <h3 className="profile-username text-center">
                          {client.name}
                          {client.postNominalLetters ? (
                            <span className="post-nominal-letters">
                              , {client.postNominalLetters}
                            </span>
                          ) : null}
                        </h3>

                        <ul className="list-group list-group-unbordered mb-3">
                          <li className="list-group-item">
                            <b>
                              <i className="fas fa-lg fa-envelope"></i> Email
                            </b>{" "}
                            <a
                              className="float-right"
                              href={`mailto:${client.email}`}
                            >
                              {client.email}
                            </a>
                          </li>
                          <li className="list-group-item">
                            <b>
                              <i className="fas fa-lg fa-phone"></i> Office
                              Phone Number
                            </b>
                            <a
                              className="float-right"
                              href={`tel:+${client.clientContactDetails[0].officePhoneNumber}`}
                            >
                              {client.clientContactDetails[0].officePhoneNumber}
                            </a>
                          </li>
                          {client.clientContactDetails[0].address1 ? (
                            <li className="list-group-item">
                              <b>
                                <i className="fas fa-map-marker-alt mr-1"></i>{" "}
                                Address{" "}
                                {client.clientContactDetails.length > 1 ? (
                                  <span
                                    className="badge badge-client-primary right mr-2"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Addresses Found"
                                  >
                                    {client.clientContactDetails.length}
                                  </span>
                                ) : null}
                                {client.clientContactDetailsSuggestions.length >
                                0 ? (
                                  <i
                                    className="fa fa-exclamation text-danger"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Pending Suggestion"
                                  ></i>
                                ) : null}
                              </b>

                              <p className="text-muted">
                                {client.clientContactDetails[0].address1 ? (
                                  <>
                                    {client.clientContactDetails[0].address1},{" "}
                                  </>
                                ) : null}{" "}
                                {client.clientContactDetails[0].address2 ? (
                                  <>
                                    {client.clientContactDetails[0].address2},{" "}
                                  </>
                                ) : null}{" "}
                                {client.clientContactDetails[0].city ? (
                                  <>{client.clientContactDetails[0].city}, </>
                                ) : null}{" "}
                                {client.clientContactDetails[0].state ? (
                                  <>{client.clientContactDetails[0].state}, </>
                                ) : null}{" "}
                                {client.clientContactDetails[0].zip ? (
                                  <>{client.clientContactDetails[0].zip}</>
                                ) : null}
                              </p>
                            </li>
                          ) : null}
                        </ul>
                      </div>
                      <div className="card-footer">
                        <div className="text-right">
                          <Link
                            to={`/client/${client.id}/true`}
                            id={client.id}
                            className="btn bg-gradient-info btn-sm mr-1"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Edit"
                          >
                            <i className="fas fa-pencil-alt mr-0"></i>

                            <span className="d-inline d-sm-none ml-1">
                              Edit
                            </span>
                          </Link>
                          {isAdmin ? (
                            <>
                              <button
                                className="btn bg-gradient-danger btn-sm mr-1"
                                onClick={() => deleteClient(client.id)}
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Delete"
                              >
                                <i className="fas fa-trash mr-0"></i>
                                <span className="d-inline d-sm-none ml-1">
                                  Delete
                                </span>
                              </button>
                            </>
                          ) : null}
                          <Link
                            to={`/client/${client.id}`}
                            id={client.id}
                            className="btn bg-gradient-primary btn-sm"
                          >
                            <i className="fas fa-user-nurse"></i>
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

// function compare(a, b) {
//   const nameA = a.name.toUpperCase();
//   const nameB = b.name.toUpperCase();

//   let comparison = 0;
//   if (nameA > nameB) {
//     comparison = 1;
//   } else if (nameA < nameB) {
//     comparison = -1;
//   }
//   return comparison;
// }

const mapStateToProps = (state, ownProps) => {
  const isAdmin = state.session.isAdmin;
  const clientsJSON = JSON.parse(JSON.stringify(state.clients));
  const clients = clientsJSON
    .map((client) => {
      return {
        ...client,
        clientContactDetails: client.clientContactDetails.map((contact) => {
          return {
            ...contact,
            toggleEdit: false,
          };
        }),
      };
    })
    .sort(compare);
  $('[data-toggle="tooltip"]').tooltip();
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
        html:
          "<b><i>All address(es) attached to this client will also be removed from the database.</i></b>",
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

export const ConnectedClientsList = connect(
  mapStateToProps,
  mapDispatchStateToProps
)(ClientsList);
