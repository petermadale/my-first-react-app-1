import React from "react";
import { connect } from "react-redux";
import styles from "./Client.module.css";
import { ConnectedButtonFavorite } from "../clientfunctions/ButtonFavorite/ButtonFavorite";
import { ConnectedUsernameDisplay } from "../../../UsernameDisplay";
import { Link } from "react-router-dom";

export const Client = ({client, isAdmin, requestDeleteClient, owner}) => (
<>
<div
      className="col-12 col-sm-6 col-md-4 d-flex align-items-stretch"
      key={client.id}
    >
      <div
        className={`card ${!client.isVerified || (client.clientsDeleteRequest && client.clientsDeleteRequest.length > 0) ? "card-warning" : "card-client-primary"} card-outline ${styles.cardClient}`}
      >
        <div className="card-body box-profile">
          {client.isVerified && !(client.clientsDeleteRequest && client.clientsDeleteRequest.length > 0) ? <ConnectedButtonFavorite client={client} /> : null}
          {!client.isVerified ? <><small className="badge badge-warning">Not Yet Verified</small><br/></> : null}
          {client.clientsDeleteRequest && client.clientsDeleteRequest.length > 0 ? 
          <small className="badge badge-warning">Delete Request Pending {owner === client.clientsDeleteRequest[0].owner || isAdmin ? <>(by <ConnectedUsernameDisplay id={client.clientsDeleteRequest[0].owner} />)</> : null}</small> 
          : null}
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
                <i className="fas fa-lg fa-phone"></i> Office Phone
                Number
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
                      {client.clientContactDetails.length} Addresses Found
                    </span>
                  ) : null}
                  {client.clientContactDetailsSuggestions.length >
                  0 ? (
                    <span className="badge badge-danger right mr-2">Pending Address Suggestion</span>
                  ) : null}
                </b>

                <p className="text-muted">
                  {client.clientContactDetails[0].address1 ? (
                    <>{client.clientContactDetails[0].address1}, </>
                  ) : null}{" "}
                  {client.clientContactDetails[0].address2 ? (
                    <>{client.clientContactDetails[0].address2}, </>
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
            {client.assignedLocations.length > 0 ? (
              <li className="list-group-item">
                <b>
                  <i className="fas fa-location-arrow mr-1"></i>{" "}
                  Location{" "}
                </b>

                <p className="text-muted">
                {client.assignedLocations.map((loc, index) => (
              <span key={loc}>
                {loc}
                {index + 1 === client.assignedLocations.length ? null : ", "}
              </span>
            ))}
                </p>
              </li>
            ) : null}
          </ul>
            {client.lastContactedBy ? 
            <span className="badge badge-info">Last contacted by <ConnectedUsernameDisplay id={client.lastContactedBy} /> {client.lastContactedDate}</span> 
            : null}
        </div>
        <div className="card-footer">
          <div className="text-right">
          {isAdmin || client.isVerified ? <>
            <Link
              to={`/meetings-new/${client.id}`}
              id={client.id}
              className="btn bg-gradient-dark btn-sm mr-1"
              data-toggle="tooltip"
              data-placement="top"
              title="Add Meeting"
            >
              <i className="fa fa-calendar-alt mr-0"></i>
              <span className="d-inline d-sm-none ml-1">
                Add Meeting
              </span>
            </Link>
            <Link
              to={`/client/${client.id}/true`}
              id={client.id}
              className="btn bg-gradient-info btn-sm mr-1"
              data-toggle="tooltip"
              data-placement="top"
              title="Edit"
            >
              <i className="fas fa-pencil-alt mr-0"></i>
              <span className="d-inline d-sm-none ml-1">Edit</span>
            </Link>
            <button
                className="btn bg-gradient-danger btn-sm mr-1"
                disabled={`${!isAdmin && client.clientsDeleteRequest && client.clientsDeleteRequest.length > 0 ? "disabled" : ""}`}
                onClick={() => requestDeleteClient(client, isAdmin, owner)}
                data-toggle="tooltip"
                data-placement="top"
                title="Delete"
            >
                <i className="fas fa-trash mr-0"></i>
                <span className="d-inline d-sm-none ml-1">
                Delete
                </span>
            </button>
          </> : null }
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
</>
    );

const mapStateToProps = (state, ownProps) => {
    const {client, isAdmin, requestDeleteClient, owner} = ownProps;
  return {
      client,
      isAdmin,
      requestDeleteClient,
      owner
  };
};
export const ConnectedClient = connect(mapStateToProps)(Client);