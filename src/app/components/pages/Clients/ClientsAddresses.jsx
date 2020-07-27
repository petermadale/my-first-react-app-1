import React from "react";
import { connect } from "react-redux";
import { history } from "../../../store/history";
import avatar from "../../../admin-lte/dist/img/avatar5.png";
import { ConnectedClientContactDetails } from "./clientcontactdetails/ClientContactDetails";

export const ClientsAddress = ({ history, client }) => (
  <>
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Client Detail</h1>
          </div>
          <div className="col-sm-6">
            <button
              type="button"
              className="btn bg-gradient-secondary float-right"
              onClick={history.goBack}
            >
              <i className="fa fa-angle-double-left"></i> Back to {client.name}
            </button>
          </div>
        </div>
      </div>
    </section>

    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <div className="card card-client-primary card-outline">
              <div className="card-body box-profile">
                {/* <div className="text-center">
                  <img
                    className="profile-user-img img-fluid img-circle"
                    src={avatar}
                    alt="User profile picture"
                  />
                </div> */}

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
                    <b>Email</b>{" "}
                    <a className="float-right" href={`mailto:${client.email}`}>
                      {client.email}
                    </a>
                  </li>
                  {client.website ? (
                    <li className="list-group-item">
                      <b>Website</b>{" "}
                      <a
                        className="float-right"
                        href={`mailto:${client.website}`}
                      >
                        {client.website}
                      </a>
                    </li>
                  ) : null}
                  {client.nameOfOrg ? (
                    <li className="list-group-item">
                      <b>Name of Organization</b>{" "}
                      <span className="float-right">{client.nameOfOrg}</span>
                    </li>
                  ) : null}
                  {client.titleWithOrg ? (
                    <li className="list-group-item">
                      <b>Title with Organization</b>{" "}
                      <span className="float-right">{client.titleWithOrg}</span>
                    </li>
                  ) : null}
                  {client.licenseNumber ? (
                    <li className="list-group-item">
                      <b>License Number</b>{" "}
                      <span className="float-right">
                        {client.licenseNumber}
                      </span>
                    </li>
                  ) : null}
                  {client.licenseExpiryDate ? (
                    <li className="list-group-item">
                      <b>License Expiry Date</b>{" "}
                      <span className="float-right">
                        {client.licenseExpiryDate}
                      </span>
                    </li>
                  ) : null}
                  {client.licenseLastVerifiedDate ? (
                    <li className="list-group-item">
                      <b>License Last Verified Date</b>{" "}
                      <span className="float-right">
                        {client.licenseLastVerifiedDate}
                      </span>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="card card-client-primary card-outline">
              <div className="card-body">
                <ConnectedClientContactDetails
                  clientID={client.id}
                  clientContactDetails={client.clientContactDetails}
                  addressView
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

const mapStateToProps = (state, ownProps) => {
  const clientID = ownProps.match.params.clientID;
  const client = state.clients.find((client) => {
    return client.id === clientID ? { ...client } : null;
  });
  return {
    history,
    client,
  };
};
export const ConnectedClientsAddress = connect(mapStateToProps)(ClientsAddress);
