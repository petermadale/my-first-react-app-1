import React from "react";
import PropTypes from "prop-types";
import styles from "./ClientsDetail.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setClientName } from "../../../../store/mutations";
import { history } from "../../../../store/history";
import { ConnectedClientsEdit } from "../ClientsEdit/ClientsEdit";
import { ConnectedClientsDetailLeft } from "../ClientsDetailLeft/ClientsDetailLeft";

const ClientsDetail = ({ isEdit, client }) => (
  <>
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>{client.name}</h1>
          </div>
          <div className="col-sm-6">
            <Link
              to="/clients"
              className="btn bg-gradient-secondary float-right"
            >
              <i className="fa fa-angle-double-left"></i> Back to Clients
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="content">
      {isEdit ? (
        <ConnectedClientsEdit client={client} />
      ) : (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <ConnectedClientsDetailLeft client={client} />
            </div>
            <div className="col-md-9">
              <div className="card card-client-primary card-outline card-outline-tabs">
                <div className="card-header p-0 border-bottom-0">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        href="#aboutMe"
                        data-toggle="pill"
                        role="tab"
                      >
                        About Me
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#notes" data-toggle="tab">
                        Notes
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="aboutMe">
                      <div className="row">
                        <div className="col-12">
                          <div className="info-box">
                            <span className="info-box-icon bg-client-primary elevation-1">
                              <i className="fas fa-people-carry"></i>
                            </span>

                            <div className="info-box-content">
                              <span className="info-box-text">
                                Populations Served
                              </span>
                              <span className="info-box-number">
                                {client.populationsServed ? (
                                  <>
                                    {client.populationsServed.map(
                                      (c, index) => (
                                        <span
                                          className="badge bg-client-primary mr-1"
                                          key={c}
                                        >
                                          {c}
                                        </span>
                                      )
                                    )}
                                  </>
                                ) : (
                                  <span>None</span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="info-box">
                            <span className="info-box-icon bg-client-primary elevation-1">
                              <i className="fas fa-users-cog"></i>
                            </span>

                            <div className="info-box-content">
                              <span className="info-box-text">
                                Types of Services
                              </span>
                              <span className="info-box-number">
                                {client.typesOfServices ? (
                                  <>
                                    {client.typesOfServices.map((c, index) => (
                                      <span
                                        className="badge bg-client-primary mr-1"
                                        key={c}
                                      >
                                        {c}
                                      </span>
                                    ))}
                                  </>
                                ) : (
                                  <span>None</span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="info-box">
                            <span className="info-box-icon bg-client-primary elevation-1">
                              <i className="fas fa-clipboard"></i>
                            </span>

                            <div className="info-box-content">
                              <span className="info-box-text">Specialties</span>
                              <span className="info-box-number">
                                {client.specialties ? (
                                  <>
                                    {client.specialties.map((c, index) => (
                                      <span
                                        className="badge bg-client-primary mr-1"
                                        key={c}
                                      >
                                        {c}
                                      </span>
                                    ))}
                                  </>
                                ) : (
                                  <span>None</span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="info-box">
                            <span className="info-box-icon bg-client-primary elevation-1">
                              <i className="fas fa-users"></i>
                            </span>

                            <div className="info-box-content">
                              <span className="info-box-text">
                                Groups Offered
                              </span>
                              <span className="info-box-number">
                                {client.groupsOffered ? (
                                  <>
                                    {client.groupsOffered.map((c, index) => (
                                      <span
                                        className="badge bg-client-primary mr-1"
                                        key={c}
                                      >
                                        {c}
                                      </span>
                                    ))}
                                  </>
                                ) : (
                                  <span>None</span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="info-box">
                            <span className="info-box-icon bg-client-primary elevation-1">
                              <i className="fas fa-hand-holding-medical"></i>
                            </span>

                            <div className="info-box-content">
                              <span className="info-box-text">
                                Insurance Accepted
                              </span>
                              <span className="info-box-number">
                                {client.insuranceAccepted ? (
                                  <>
                                    {client.insuranceAccepted.map(
                                      (c, index) => (
                                        <span
                                          className="badge bg-client-primary mr-1"
                                          key={c}
                                        >
                                          {c}
                                        </span>
                                      )
                                    )}
                                  </>
                                ) : (
                                  <span>None</span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="info-box">
                            <span className="info-box-icon bg-client-primary elevation-1">
                              <i className="fas fa-location-arrow"></i>
                            </span>

                            <div className="info-box-content">
                              <span className="info-box-text">
                                Assigned Locations
                              </span>
                              <span className="info-box-number">
                                {client.assignedLocations ? (
                                  <>
                                    {client.assignedLocations.map(
                                      (c, index) => (
                                        <span
                                          className="badge bg-client-primary mr-1"
                                          key={c}
                                        >
                                          {c}
                                        </span>
                                      )
                                    )}
                                  </>
                                ) : (
                                  <span>None</span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="notes">
                      <form className="form-horizontal">
                        <div className="form-group row">
                          <label
                            htmlFor="inputNotes"
                            className="col-sm-2 col-form-label"
                          >
                            Notes
                          </label>
                          <div className="col-sm-10">
                            <textarea
                              className="form-control"
                              id="inputNotes"
                              value={client.notes}
                              readOnly
                            ></textarea>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
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
  const id = ownProps.match.params.id;
  const isEdit = ownProps.match.params.isEdit === "true" ? true : false;
  const client = state.clients.find((client) => client.id === id);
  return {
    client,
    isEdit,
  };
};

const mapDispatchStateToProps = (dispatch, ownProps) => {
  let id = ownProps.match.params.id;
  return {
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
