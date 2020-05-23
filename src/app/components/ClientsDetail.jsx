import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setClientName } from "../store/mutations";
import { history } from "../store/history";
import { ConnectedClientsEdit } from "./ClientsEdit";
import { ConnectedPersonalNotes } from "./PersonalNotes";
import { ConnectedPersonalNotesNew } from "./PersonalNotesNew";
import { ConnectedClientsDetailLeft } from "./ClientsDetailLeft";

const ClientsDetail = ({
  isAdmin,
  isEdit,
  client,
  setClientName,
  personalnotes,
}) => (
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
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <ConnectedClientsDetailLeft client={client} />
            </div>
            <div className="col-md-9">
              <div className="card">
                <div className="card-header p-2">
                  <ul className="nav nav-pills">
                    {personalnotes.length > 0 ? (
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          href="#personalnotes"
                          data-toggle="tab"
                        >
                          Personal Notes
                        </a>
                      </li>
                    ) : null}
                    <li className="nav-item">
                      <a
                        className={`nav-link ${
                          personalnotes.length === 0 ? "active" : ""
                        }`}
                        href="#addpersonalnote"
                        data-toggle="tab"
                      >
                        Add Personal Note
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        href="#scheduleameeting"
                        data-toggle="tab"
                      >
                        Schedule a Meeting
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <div className="tab-content">
                    <div
                      className={`tab-pane ${
                        personalnotes.length > 0 ? "active" : ""
                      }`}
                      id="personalnotes"
                    >
                      <ConnectedPersonalNotes client={client} />
                    </div>
                    <div
                      className={`tab-pane ${
                        personalnotes.length === 0 ? "active" : ""
                      }`}
                      id="addpersonalnote"
                    >
                      <ConnectedPersonalNotesNew client={client} />
                    </div>
                    <div className="tab-pane" id="scheduleameeting">
                      <p>Schedule a Meeting</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="text-center mt-5 mb-3">
                <Link to="/clients" className="btn btn-secondary btn-sm">
                  Back to Clients
                </Link>
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
  const isAdmin = state.session.isAdmin;
  const client = state.clients.find((client) => client.id === id);
  const personalnotes = client.personalnotes;
  return {
    client,
    isAdmin,
    isEdit,
    personalnotes,
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
